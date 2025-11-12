import { StatusCardList } from "@/components/ui/StatuCardList";

export default function SubmittedBids() {
  const bidsData = [
    { 
      id: 1, 
      title: "Shoprite Group Development", 
      subtitle: "Amount: $234,987 • Submitted:Dec, 17,2025", 
      status: "Approved" 
    },
    { 
      id: 2, 
      title: "Shoprite Group Development", 
      subtitle: "Amount: $234,987 • Submitted:Dec, 17,2025", 
      status: "Rejected" 
    },
    { 
      id: 3, 
      title: "Shoprite Group Development", 
      subtitle: "Amount: $234,987 • Submitted:Dec 17, 2025", 
      status: "Pending" 
    },
    { 
      id: 4, 
      title: "Shoprite Group Development", 
      subtitle: "Amount: $234,987 • Submitted:Dec 17, 2025", 
      status: "Approved" 
    },
  ];

  return <StatusCardList title="Submitted Bids" items={bidsData} />;
}
