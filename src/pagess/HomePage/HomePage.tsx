"use server";
import Link from "next/link";
import { Card } from "antd";
import styles from "./styles.module.css";

export default async function HomePage() {
  return (
    <div className={styles.home}>
      <Card
        size="small"
        title="First page"
        extra={<Link href={"lists/1"}>link</Link>}
        style={{ width: 300 }}
      >
        <p>First page</p>
      </Card>
    </div>
  );
}
