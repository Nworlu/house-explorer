import Link from "next/link";

export default function PropertyNotFound() {
  return <main className="not-found"><span>404 / Property record</span><h1>This address has no published property.</h1><p>Check the property link or return to the working demonstration.</p><Link className="button button-primary" href="/explore/demo-house">Open demo house</Link></main>;
}
