import axios from 'axios';

export const UpgradeButton = ({ userEmail, userName }) => {
    const handlePayment = async () => {
        try {
            const res = await axios.post('http://localhost:5000/api/pay', {
                email: userEmail,
                name: userName,
                amount: 15000 // 15,000 UGX for a season pass
            });

            if (res.data.status === 'success') {
                // Send the user to the Flutterwave payment page
                window.location.href = res.data.data.link;
            }
        } catch (err) {
            console.log("Payment initialization error:", err);
            alert("Payment failed to start. Try again.");
        }
    };

    return (
        <button 
            onClick={handlePayment}
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
        >
            🚀 Upgrade to Pro (15,000 UGX)
        </button>
    );
};