export default function Footer() {
  return (
    <footer className="bg-white rounded-lg shadow m-2 dark:bg-gray-800">
      <div className="w-full mx-auto max-w-screen-2xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            CUZIAM
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a
              href="https://github.com/cuziam"
              className="hover:underline me-4 md:me-6"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://cuziam.tistory.com/"
              className="hover:underline me-4 md:me-6"
            >
              Tistory
            </a>
          </li>
          <li>Contact: yameame320@gmail.com</li>
        </ul>
      </div>
    </footer>
  );
}
