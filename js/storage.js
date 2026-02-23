/**
 * Storage Module - Manages all data persistence with localStorage
 */

const Storage = {
    // Keys
    KEYS: {
        USER: 'gpay_user',
        BALANCE: 'gpay_balance',
        TRANSACTIONS: 'gpay_transactions',
        CRYPTO_WALLETS: 'gpay_crypto_wallets',
        FIXED_DEPOSITS: 'gpay_fixed_deposits',
        SUBSCRIPTIONS: 'gpay_subscriptions',
        LOANS: 'gpay_loans',
        EXPENSES: 'gpay_expenses',
        BUDGET_CATEGORIES: 'gpay_budget_categories',
        REFERRAL: 'gpay_referral',
        LOYALTY_TIER: 'gpay_loyalty_tier',
        NOTIFICATIONS: 'gpay_notifications',
        BANK_ACCOUNTS: 'gpay_bank_accounts',
    },

    // Initialize with default data
    init() {
        if (!localStorage.getItem(this.KEYS.USER)) {
            localStorage.setItem(this.KEYS.USER, JSON.stringify({
                name: 'Rahul Kumar',
                email: 'rahul@example.com',
                phone: '+91 9876543210',
                avatar: 'https://via.placeholder.com/50',
            }));
        }

        if (!localStorage.getItem(this.KEYS.BALANCE)) {
            localStorage.setItem(this.KEYS.BALANCE, JSON.stringify(75500.50));
        }

        if (!localStorage.getItem(this.KEYS.TRANSACTIONS)) {
            localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify([
                {
                    id: '1',
                    type: 'received',
                    amount: 5000,
                    description: 'Salary Credit',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: '2',
                    type: 'sent',
                    amount: 500,
                    description: 'Bill Payment',
                    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                },
                {
                    id: '3',
                    type: 'sent',
                    amount: 1200,
                    description: 'Lunch with friends',
                    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.CRYPTO_WALLETS)) {
            localStorage.setItem(this.KEYS.CRYPTO_WALLETS, JSON.stringify([
                {
                    id: '1',
                    symbol: 'BTC',
                    name: 'Bitcoin',
                    quantity: 0.0234,
                    currentPrice: 43250,
                    balance: 1012.445,
                    change24h: 2.5,
                    icon: '₿',
                },
                {
                    id: '2',
                    symbol: 'ETH',
                    name: 'Ethereum',
                    quantity: 0.5,
                    currentPrice: 2250,
                    balance: 1125,
                    change24h: -1.2,
                    icon: 'Ξ',
                },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.FIXED_DEPOSITS)) {
            localStorage.setItem(this.KEYS.FIXED_DEPOSITS, JSON.stringify([
                {
                    id: '1',
                    amount: 50000,
                    depositDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    maturityDate: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
                    interestRate: 6.5,
                    tenure: 12,
                    status: 'active',
                    interestEarned: 3250,
                    totalAmount: 53250,
                },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.SUBSCRIPTIONS)) {
            localStorage.setItem(this.KEYS.SUBSCRIPTIONS, JSON.stringify([
                {
                    id: '1',
                    name: 'Netflix',
                    vendor: 'Netflix Inc.',
                    amount: 199,
                    frequency: 'monthly',
                    nextBillingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
                    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'active',
                    category: 'Entertainment',
                    autoRenew: true,
                },
                {
                    id: '2',
                    name: 'Spotify Premium',
                    vendor: 'Spotify AB',
                    amount: 119,
                    frequency: 'monthly',
                    nextBillingDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
                    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'active',
                    category: 'Music',
                    autoRenew: true,
                },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.LOANS)) {
            localStorage.setItem(this.KEYS.LOANS, JSON.stringify([
                {
                    id: '1',
                    amount: 200000,
                    interestRate: 9.5,
                    tenure: 60,
                    monthlyEMI: 4167,
                    startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                    endDate: new Date(Date.now() + 1740 * 24 * 60 * 60 * 1000).toISOString(),
                    status: 'active',
                    paidAmount: 25002,
                    remainingAmount: 174998,
                },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.BUDGET_CATEGORIES)) {
            localStorage.setItem(this.KEYS.BUDGET_CATEGORIES, JSON.stringify([
                {
                    id: '1',
                    name: 'Food & Dining',
                    icon: '🍔',
                    color: '#FF6B6B',
                    budget: 8000,
                    spent: 5240,
                    percentage: 65.5,
                },
                {
                    id: '2',
                    name: 'Transportation',
                    icon: '🚗',
                    color: '#4ECDC4',
                    budget: 5000,
                    spent: 3150,
                    percentage: 63,
                },
                {
                    id: '3',
                    name: 'Entertainment',
                    icon: '🎬',
                    color: '#95E1D3',
                    budget: 3000,
                    spent: 2100,
                    percentage: 70,
                },
                {
                    id: '4',
                    name: 'Shopping',
                    icon: '🛍️',
                    color: '#F8B500',
                    budget: 10000,
                    spent: 8750,
                    percentage: 87.5,
                },
            ]));
        }

        if (!localStorage.getItem(this.KEYS.REFERRAL)) {
            localStorage.setItem(this.KEYS.REFERRAL, JSON.stringify({
                id: '1',
                referralCode: 'GPAY123456',
                referredCount: 5,
                earnedAmount: 2500,
                referredUsers: [
                    {
                        id: '1',
                        name: 'Arjun Singh',
                        phone: '+91 9876543210',
                        status: 'verified',
                        earnedReward: 500,
                        joinDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                    {
                        id: '2',
                        name: 'Priya Patel',
                        phone: '+91 8765432109',
                        status: 'verified',
                        earnedReward: 500,
                        joinDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
                    },
                ],
                status: 'active',
                createdDate: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000).toISOString(),
            }));
        }

        if (!localStorage.getItem(this.KEYS.LOYALTY_TIER)) {
            localStorage.setItem(this.KEYS.LOYALTY_TIER, JSON.stringify({
                tier: 'gold',
                points: 4500,
                multiplier: 1.5,
                benefits: ['Free transfers', 'Priority support', 'Higher cashback'],
            }));
        }

        if (!localStorage.getItem(this.KEYS.NOTIFICATIONS)) {
            localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify([]));
        }

        if (!localStorage.getItem(this.KEYS.BANK_ACCOUNTS)) {
            localStorage.setItem(this.KEYS.BANK_ACCOUNTS, JSON.stringify([
                {
                    id: '1',
                    accountHolder: 'Rahul Kumar',
                    bankName: 'HDFC Bank',
                    accountNumber: '****5432',
                    ifsc: 'HDFC0001234',
                    balance: 75500.50,
                    isDefault: true,
                },
            ]));
        }
    },

    // User Methods
    getUser() {
        return JSON.parse(localStorage.getItem(this.KEYS.USER));
    },

    updateUser(userData) {
        localStorage.setItem(this.KEYS.USER, JSON.stringify(userData));
    },

    // Balance Methods
    getBalance() {
        return JSON.parse(localStorage.getItem(this.KEYS.BALANCE)) || 0;
    },

    updateBalance(newBalance) {
        localStorage.setItem(this.KEYS.BALANCE, JSON.stringify(newBalance));
    },

    // Transaction Methods
    getTransactions() {
        return JSON.parse(localStorage.getItem(this.KEYS.TRANSACTIONS)) || [];
    },

    addTransaction(transaction) {
        const transactions = this.getTransactions();
        transactions.unshift({
            ...transaction,
            id: Date.now().toString(),
            date: new Date().toISOString(),
        });
        localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(transactions));
    },

    // Crypto Methods
    getCryptoWallets() {
        return JSON.parse(localStorage.getItem(this.KEYS.CRYPTO_WALLETS)) || [];
    },

    updateCryptoWallets(wallets) {
        localStorage.setItem(this.KEYS.CRYPTO_WALLETS, JSON.stringify(wallets));
    },

    // Fixed Deposits Methods
    getFixedDeposits() {
        return JSON.parse(localStorage.getItem(this.KEYS.FIXED_DEPOSITS)) || [];
    },

    addFixedDeposit(deposit) {
        const deposits = this.getFixedDeposits();
        deposits.push({
            ...deposit,
            id: Date.now().toString(),
            depositDate: new Date().toISOString(),
        });
        localStorage.setItem(this.KEYS.FIXED_DEPOSITS, JSON.stringify(deposits));
    },

    // Subscriptions Methods
    getSubscriptions() {
        return JSON.parse(localStorage.getItem(this.KEYS.SUBSCRIPTIONS)) || [];
    },

    addSubscription(subscription) {
        const subscriptions = this.getSubscriptions();
        subscriptions.push({
            ...subscription,
            id: Date.now().toString(),
        });
        localStorage.setItem(this.KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
    },

    updateSubscription(id, updates) {
        const subscriptions = this.getSubscriptions();
        const index = subscriptions.findIndex(s => s.id === id);
        if (index !== -1) {
            subscriptions[index] = { ...subscriptions[index], ...updates };
            localStorage.setItem(this.KEYS.SUBSCRIPTIONS, JSON.stringify(subscriptions));
        }
    },

    // Loans Methods
    getLoans() {
        return JSON.parse(localStorage.getItem(this.KEYS.LOANS)) || [];
    },

    addLoan(loan) {
        const loans = this.getLoans();
        loans.push({
            ...loan,
            id: Date.now().toString(),
            startDate: new Date().toISOString(),
        });
        localStorage.setItem(this.KEYS.LOANS, JSON.stringify(loans));
    },

    // Budget Methods
    getBudgetCategories() {
        return JSON.parse(localStorage.getItem(this.KEYS.BUDGET_CATEGORIES)) || [];
    },

    updateBudgetCategories(categories) {
        localStorage.setItem(this.KEYS.BUDGET_CATEGORIES, JSON.stringify(categories));
    },

    // Referral Methods
    getReferral() {
        return JSON.parse(localStorage.getItem(this.KEYS.REFERRAL));
    },

    updateReferral(referral) {
        localStorage.setItem(this.KEYS.REFERRAL, JSON.stringify(referral));
    },

    // Loyalty Methods
    getLoyaltyTier() {
        return JSON.parse(localStorage.getItem(this.KEYS.LOYALTY_TIER));
    },

    updateLoyaltyTier(tier) {
        localStorage.setItem(this.KEYS.LOYALTY_TIER, JSON.stringify(tier));
    },

    // Notifications Methods
    getNotifications() {
        return JSON.parse(localStorage.getItem(this.KEYS.NOTIFICATIONS)) || [];
    },

    addNotification(notification) {
        const notifications = this.getNotifications();
        notifications.unshift({
            ...notification,
            id: Date.now().toString(),
            date: new Date().toISOString(),
            isRead: false,
        });
        localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(notifications));
    },

    // Bank Accounts Methods
    getBankAccounts() {
        return JSON.parse(localStorage.getItem(this.KEYS.BANK_ACCOUNTS)) || [];
    },

    addBankAccount(account) {
        const accounts = this.getBankAccounts();
        accounts.push({
            ...account,
            id: Date.now().toString(),
        });
        localStorage.setItem(this.KEYS.BANK_ACCOUNTS, JSON.stringify(accounts));
    },

    // Clear all data (for logout)
    clearAll() {
        Object.values(this.KEYS).forEach(key => {
            localStorage.removeItem(key);
        });
    },
};
