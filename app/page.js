"use client";
import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function Home() {
  const [studentList, setStudentList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadStudentList();
  }, []);

  async function loadStudentList() {
    setLoading(true);
    setError(null);
    
    const { data, error } = await supabase.from("Student").select();

    if (error) {
      setError("Failed to fetch students. Please try again later.");
      setLoading(false);
      return;
    }
    
    setStudentList(data);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Student List</h1>

      {loading ? (
        <p className="text-lg text-gray-600">Loading students...</p>
      ) : error ? (
        <p className="text-lg text-red-500">{error}</p>
      ) : studentList.length === 0 ? (
        <p className="text-lg text-gray-600">No students found.</p>
      ) : (
        <div className="w-full max-w-4xl overflow-x-auto">
          <table className="w-full border border-gray-300 bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 border">USN</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Gender</th>
              </tr>
            </thead>
            <tbody>
              {studentList.map((student, index) => (
                <tr key={student.usn} className={`text-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
                  <td className="p-3 border">{student.usn}</td>
                  <td className="p-3 border">{student.name}</td>
                  <td className="p-3 border">{student.phone}</td>
                  <td className="p-3 border">{student.email}</td>
                  <td className="p-3 border">{student.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}