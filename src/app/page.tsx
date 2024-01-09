"use client";

import { useState } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleButtonClick = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: inputValue,
        }),
      });
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.choices[0].message.content);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-800 p-4 rtl">
      <nav className="item-start px-8 pt-2 shadow-md">
        <div className="-mb-px flex justify-center">
          <a
            className="no-underline text-teal-dark border-b-2 border-teal-dark uppercase tracking-wide font-bold text-xs py-3 mr-8"
            href="#"
          >
            منشي عنوان النص
          </a>
          <a
            className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
            href="#"
          >
            انشطة الطلاب
          </a>
          <a
            className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3 mr-8"
            href="#"
          >
            الاسئلة
          </a>
          <a
            className="no-underline text-grey-dark border-b-2 border-transparent uppercase tracking-wide font-bold text-xs py-3"
            href="#"
          >
            الاختبارات
          </a>
        </div>
      </nav>

      <div className="w-full rtl pt-5 ">
        <div className="flex flex-col">
          <h1 className="py-5 text-2xl text-right font-bold text-gray-900 dark:text-white">
            منشي عنوان النص بالذكاء الاصطناعي
          </h1>
          <textarea
            value={inputValue}
            onChange={handleChange}
            className="text-right border  h-28 border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white flex-grow mr-2 rounded-md"
            rows={4} // Adjust the number of rows as needed
          />
          <div className="flex flex-row pt-5 justify-end">
            <button
              onClick={() => setInputValue("")}
              className="relative inline-flex  p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-600 to-red-500 group-hover:from-red-600 group-hover:to-red-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800"
            >
              <span className="relative px-7 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                حذف النص
              </span>
            </button>
            {loading ? (
              <button
                disabled={loading}
                className="relative inline-flex  p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-7 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  جاري المعالجة{" "}
                </span>
              </button>
            ) : (
              <button
                disabled={loading}
                onClick={handleButtonClick}
                className="relative inline-flex  p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <span className="relative px-7 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  اجلب عنوان النص
                </span>
              </button>
            )}
          </div>
        </div>
        {data && (
          <p className="text-right bg-gray-100 p-4 mt-2 rounded dark:bg-gray-700 dark:text-white">
            {data}
          </p>
        )}
      </div>
    </div>
  );
}
