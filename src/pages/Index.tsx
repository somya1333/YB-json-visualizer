
import DataDisplay from "@/components/DataDisplay";

const sampleData = {
  "data": {
    "data": {
      "uuid": "aa1bb5d2-c8d7-4ddb-9ce4-ec391444dcd4",
      "master": {
        "uuid": "aa1bb5d2-c8d7-4ddb-9ce4-ec391444dcd4",
        "eligible_products": [
          "edl"
        ]
      },
      "uw": {
        "uuid": "aa1bb5d2-c8d7-4ddb-9ce4-ec391444dcd4",
        "key": "U4Qq2MX3udvfUULzEgCj1dIf",
        "appliedDateNesfb": "2025-01-07T07:29:42.638Z",
        "ntcFlag": true,
        "policyVersion": "1.0",
        "tuEnquiriesLast30Days": 0,
        "totalActiveTradelines": 0,
        "totalCurrentBalance": 0,
        "totalEmiAmount": 942.65,
        "enquiryData": [
          {
            "amount": 90000,
            "creditorName": "HDB",
            "inquiryDate": "2024-10-18",
            "inquiryType": "CONSUMER LOAN"
          },
          {
            "amount": 50000,
            "creditorName": "DMIFINANCE",
            "inquiryDate": "2024-10-18",
            "inquiryType": "CONSUMER LOAN"
          }
        ],
        "activeTradelineData": [
          {
            "accountOpenedDate": "2025-01-24",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "BOI",
            "currentBalance": 69118,
            "emi": 6046.073891535554,
            "highBalance": 68000,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 2,
            "tenure": 12
          },
          {
            "accountOpenedDate": "2024-12-05",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "BOI",
            "currentBalance": 59677,
            "emi": 5218.841779198563,
            "highBalance": 58000,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 4,
            "tenure": 12
          },
          {
            "accountOpenedDate": "2024-11-20",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "MUTHOOTFIN",
            "currentBalance": 43025,
            "emi": 4473.347940917387,
            "highBalance": 43025,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 4,
            "tenure": 10
          },
          {
            "accountOpenedDate": "2024-11-28",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "MUTHOOTFIN",
            "currentBalance": 33925,
            "emi": 3530.4647476039363,
            "highBalance": 33925,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 4,
            "tenure": 10
          },
          {
            "accountOpenedDate": "2024-11-16",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "MUTHOOTFIN",
            "currentBalance": 32025,
            "emi": 3332.7379083866194,
            "highBalance": 32025,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 4,
            "tenure": 10
          },
          {
            "accountOpenedDate": "2024-10-19",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "HDB",
            "currentBalance": 20505,
            "emi": 3610,
            "highBalance": 33138,
            "loanType": "CONSUMER LOAN",
            "max30Plus12m": 0,
            "mob": 5,
            "tenure": 11
          },
          {
            "accountOpenedDate": "2024-11-29",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "IDFC FIRST BANK",
            "currentBalance": 5815,
            "emi": 1549.4942003425967,
            "highBalance": 11363,
            "loanType": "CONSUMER LOAN",
            "max30Plus12m": 0,
            "mob": 4,
            "tenure": 6
          },
          {
            "accountOpenedDate": "2024-11-23",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "MUTHOOTNAN",
            "currentBalance": 21500,
            "emi": 1877.9840289347078,
            "highBalance": 21500,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 4,
            "tenure": 12
          },
          {
            "accountOpenedDate": "2024-10-24",
            "amountPastDue": 0,
            "count30Plus12m": 0,
            "creditorName": "MUTHOOTFIN",
            "currentBalance": 20000,
            "emi": 2094.5648542989284,
            "highBalance": 20000,
            "loanType": "GOLD LOAN",
            "max30Plus12m": 0,
            "mob": 5,
            "tenure": 10
          }
        ],
        "touchPoint": "money-transfer"
      }
    },
    "success": true
  },
  "error": null,
  "meta": null
};

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto py-4">
          <h1 className="text-2xl font-bold text-gray-800">JSON Data Viewer</h1>
        </div>
      </header>
      <main>
        <DataDisplay data={sampleData} />
      </main>
    </div>
  );
};

export default Index;
