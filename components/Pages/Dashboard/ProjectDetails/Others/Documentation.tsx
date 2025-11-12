import { StatusCardList } from "@/components/ui/StatuCardList";

export default function Documentation() {
  const documentsData = [
    { 
      id: 1, 
      title: "progress-photos.zip", 
      subtitle: "Property Document • 8.6 MB • May 21st, 2025", 
      status: "Approved" 
    },
    { 
      id: 2, 
      title: "progress-photos.zip", 
      subtitle: "Property Document • 8.6 MB • May 21st, 2025", 
      status: "Rejected" 
    },
    { 
      id: 3, 
      title: "progress-photos.zip", 
      subtitle: "Property Document • 8.6 MB • May 21st, 2025", 
      status: "Pending" 
    },
    { 
      id: 4, 
      title: "progress-photos.zip", 
      subtitle: "Property Document • 8.6 MB • May 21st, 2025", 
      status: "Approved" 
    },
  ];

  return <StatusCardList title="Uploaded Documents" items={documentsData} />;
}