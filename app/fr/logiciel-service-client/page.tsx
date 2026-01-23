import { customerServiceFR } from "@/content/customer-service.fr";
import CallCenterPage from "@/app/components/CallCenterPage";

export const metadata = {
    title: customerServiceFR.meta.title,
    description: customerServiceFR.meta.description,
};

export default function LogicielServiceClientPage() {
    return <CallCenterPage content={customerServiceFR} />;
}
