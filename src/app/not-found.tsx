import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - 页面未找到</h1>
        <p className="mt-4 text-gray-600">
          <Link href="/dashboard">
            <Button>返回仪表板</Button>
          </Link>
        </p>
      </div>
    </div>
  );
}
