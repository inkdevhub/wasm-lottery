#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod lottery {
    use ink_prelude::vec::Vec;
    use ink_env::{
        hash::{
            Keccak256,
        }
    };

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    pub struct Lottery {
        owner: AccountId,
        running: bool,
        players: Vec<AccountId>,

    }

    /// Errors that can occur upon calling this contract.
    #[derive(Debug, PartialEq, Eq, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub enum Error {
        /// Returned if Lottery is not running.
        LotteryNotRunning,
        /// Returned if caller is not owner while required to.
        CallerNotOwner,
        /// Returned if no value was sent.
        NoValueSent,
        /// Returned if transfer failed.
        ErrTransfer,
    }

    /// Type alias for the contract's result type.
    pub type Result<T> = core::result::Result<T, Error>;

    impl Lottery {
        #[ink(constructor)]
        pub fn new() -> Self {
            Self {
                owner: Self::env().caller(),
                running: false,
                players: Vec::new(),
            }
        }

        /// Returns the current owner of the lottery
        pub fn owner(&self) -> AccountId {
            self.owner
        }

        /// Generates a random number based on the list of players
        fn random(&self) -> u64 {
            let seed = self.env().hash_encoded::<Keccak256, _>(&self.players);
            let timestamp = self.env().block_timestamp();


            u64::from_be_bytes(seed[0..8].try_into().unwrap())
        }

        /// Allows a player to enter the lottery by sending a value
        #[ink(message, payable)]
        pub fn enter(&mut self) -> Result<()> {
            if !self.running {
                return Err(Error::LotteryNotRunning)
            }
            let value: Balance = self.env().transferred_value();
            let caller = self.env().caller();
            if value < 1 {
                return Err(Error::NoValueSent)
            }
            self.players.push(caller);

            Ok(())
        }

        #[ink(message)]
        pub fn pick_winner(&mut self) -> Result<()> {
            let winner = self.random() % self.players.len() as u64;
            let recipient = self.players[winner as usize];
            let amount: Balance = self.env().balance();

            if self.env().transfer(recipient, amount).is_err() {
                return Err(Error::ErrTransfer)
            }

            self.players = Vec::new();

            Ok(())
        }

        #[ink(message)]
        pub fn start_lottery(&mut self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::CallerNotOwner)
            }
            self.running = true;

            Ok(())
        }

        #[ink(message)]
        pub fn stop_lottery(&mut self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::CallerNotOwner)
            }
            self.running = false;

            Ok(())
        }
    }
}
