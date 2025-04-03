"use client";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    loadStudentList();
  }, []);

  async function loadStudentList() {
    const { data, error } = await supabase.from("Student").select();

    if (error) {
      alert("Error fetching students: " + JSON.stringify(error));
      return;
    }
    setStudentList(data);
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Student List</h1>

      {studentList.length === 0 ? (
        <p>No students found.</p>
      ) : (
        <table className="border-collapse border border-gray-300 w-full max-w-2xl">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">USN</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Gender</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <tr key={student.usn} className="text-center">
                <td className="border p-2">{student.usn}</td>
                <td className="border p-2">{student.name}</td>
                <td className="border p-2">{student.phone}</td>
                <td className="border p-2">{student.email}</td>
                <td className="border p-2">{student.gender}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
