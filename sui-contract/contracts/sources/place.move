address sui_place {
    module place {
        use sui::transfer;
        use sui::object;
        use sui::tx_context;

        struct Donation has key, store {
            id: sui::object::UID,
            donor: address,
            amount: u64,
            timestamp: u64,
        }

        public entry fun log_donation(donor: address, amount: u64, timestamp: u64, ctx: &mut tx_context::TxContext) {
            let donation = Donation { id: object::new(ctx), donor, amount, timestamp };
            transfer::public_transfer(donation, donor);
        }
    }
}

address sui_crowdfunding {
    module crowdfunding {
        use sui::object::{Self, UID};
        use sui::transfer;
        use sui::tx_context::{TxContext};
        use sui::coin::{Self, Coin};
        use sui::balance::{Self, Balance};
        use sui::sui::SUI;

        const E_TARGET_REACHED: u64 = 31;

        struct Fund has key {
            id: UID,
            target: u64,
            raised: Balance<SUI>,
            target_reached: bool,
        }

        public fun createFund(target: u64, ctx: &mut TxContext): Fund {
            Fund {
                id: object::new(ctx),
                target,
                raised: balance::zero(),
                target_reached: false,
            }
        }

        public fun donate(fund: &mut Fund, amount: Coin<SUI>, ctx: &mut TxContext): u64 {
            assert!(!fund.target_reached, E_TARGET_REACHED);

            let amount_donated = coin::value(&amount);
            let coin_balance = coin::into_balance(amount);
            balance::join(&mut fund.raised, coin_balance);

            balance::value(&fund.raised)
        }

        public fun getFundsRaised(self: &Fund): u64 {
            balance::value(&self.raised)
        }
    }
}
