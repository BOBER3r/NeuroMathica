import { redirect } from "next/navigation";

export default function TopicDetailPage({ params }: { params: { topicId: string } }) {
  redirect(`/learn/${params.topicId}/lesson`);
}
