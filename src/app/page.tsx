import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}




// import Link from 'next/link';

// export default function Home() {
//   return (
//     <div style={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       justifyContent: 'center',
//       minHeight: '100vh',
//       textAlign: 'center',
//       fontFamily: 'system-ui, sans-serif'
//     }}>
//       <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1.5rem' }}>
//         Tutoring Platform
//       </h1>
//       <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '2.5rem', maxWidth: '600px' }}>
//         A modern solution for connecting tutors, students, and parents.
//       </p>
//       <Link
//         href="/login"
//         style={{
//           padding: '1rem 2rem',
//           background: '#4f46e5',
//           color: 'white',
//           borderRadius: '8px',
//           fontSize: '1.125rem',
//           fontWeight: '600',
//           textDecoration: 'none'
//         }}
//       >
//         Get Started
//       </Link>
//     </div>
//   );
// }
