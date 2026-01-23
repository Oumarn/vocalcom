import { customerServiceEN } from "@/content/customer-service.en";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata = {
    title: customerServiceEN.meta.title,
    description: customerServiceEN.meta.description,
};

export default function CustomerServicePage() {
    return <CallCenterPage content={customerServiceEN} />;
}
