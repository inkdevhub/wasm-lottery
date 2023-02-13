#![cfg_attr(not(feature = "std"), no_std)]

use ink_lang as ink;

#[ink::contract]
mod lottery {
    use ink_prelude::vec::Vec;
    use ink_storage::{
        traits::SpreadAllocate,
        Mapping,
    };
    use ink_env::{
        hash::{
            Keccak256,
        }
    };

    /// Defines the storage of your contract.
    /// Add new fields to the below struct in order
    /// to add new static storage fields to your contract.
    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct Lottery {
        owner: AccountId,
        running: bool,
        players: Vec<AccountId>,
        entries: Mapping<AccountId, Balance>,
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
        /// Returned if the player is already in the lottery.
        PlayerAlreadyInLottery,
    }

    #[ink(event)]
    pub struct Entered {
        /// The player who entered.
        player: AccountId,
        /// The value sent.
        value: Balance,
    }

    #[ink(event)]
    pub struct Won {
        /// The winner.
        winner: AccountId,
        /// The winning amount.
        amount: Balance,
    }

    /// Type alias for the contract's result type.
    pub type Result<T> = core::result::Result<T, Error>;

    impl Lottery {
        #[ink(constructor)]
        pub fn new() -> Self {
            ink_lang::codegen::initialize_contract(|instance: &mut Lottery| {
                instance.owner = Self::env().caller();
                instance.running = false;
                instance.players = Vec::new();
                instance.entries = Mapping::default();
            })
        }

        /// Returns the current owner of the lottery
        #[ink(message)]
        pub fn owner(&self) -> AccountId {
            self.owner
        }

        /// Returns the current state of the lottery
        #[ink(message)]
        pub fn is_running(&self) -> bool {
            self.running
        }

        /// Returns the list of players
        #[ink(message)]
        pub fn get_players(&self) -> Vec<AccountId> {
            self.players.clone()
        }

        /// Retrieve the balance of the account.
        #[ink(message)]
        pub fn get_balance(&self, caller: AccountId) -> Option<Balance> {
            self.entries.get(&caller)
        }

        /// Generates a random number based on the list of players
        fn random(&self) -> u64 {
            let seed = self.env().hash_encoded::<Keccak256, _>(&self.players);

            u64::from_be_bytes(seed[0..8].try_into().unwrap())
        }

        /// Allows a player to enter the lottery by sending a value
        #[ink(message, payable)]
        pub fn enter(&mut self) -> Result<()> {
            if !self.running {
                return Err(Error::LotteryNotRunning)
            }
            let caller = self.env().caller();
            let balance: Option<Balance> = self.entries.get(&caller);

            if balance.is_some() {
                return Err(Error::PlayerAlreadyInLottery)
            }

            let value: Balance = self.env().transferred_value();
            if value < 1 {
                return Err(Error::NoValueSent)
            }

            self.players.push(caller);
            self.entries.insert(caller, &value);

            self.env().emit_event(Entered {
                player: caller,
                value: value
            });

            Ok(())
        }

        #[ink(message)]
        pub fn pick_winner(&mut self) -> Result<()> {
            let winner_index = self.random() % self.players.len() as u64;
            let winner = self.players[winner_index as usize];
            let amount: Balance = self.env().balance();

            if self.env().transfer(winner, amount).is_err() {
                return Err(Error::ErrTransfer)
            }

            self.players = Vec::new();
            self.entries = Mapping::default();

            self.env().emit_event(Won {
                winner,
                amount
            });

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
