export default function ServerStatusDetailToggle() {
  return (
    <div className="toggle flex h-8 gap-2 ">
      <svg
        className="h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 9.5H21M3 14.5H21M8 4.5V19.5M6.2 19.5H17.8C18.9201 19.5 19.4802 19.5 19.908 19.282C20.2843 19.0903 20.5903 18.7843 20.782 18.408C21 17.9802 21 17.4201 21 16.3V7.7C21 6.5799 21 6.01984 20.782 5.59202C20.5903 5.21569 20.2843 4.90973 19.908 4.71799C19.4802 4.5 18.9201 4.5 17.8 4.5H6.2C5.0799 4.5 4.51984 4.5 4.09202 4.71799C3.71569 4.90973 3.40973 5.21569 3.21799 5.59202C3 6.01984 3 6.57989 3 7.7V16.3C3 17.4201 3 17.9802 3.21799 18.408C3.40973 18.7843 3.71569 19.0903 4.09202 19.282C4.51984 19.5 5.07989 19.5 6.2 19.5Z"
          stroke="#000000"
          stroke-width="2"
        />
      </svg>
      <label className="inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <span></span>
        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
      <svg
        className="h-full"
        fill="#000000"
        viewBox="0 0 256 256"
        id="Flat"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M231.99951,208a8.00039,8.00039,0,0,1-8,8h-192a8.00039,8.00039,0,0,1-8-8V48a8,8,0,0,1,16,0V156.68848l50.3457-50.34571a8.00122,8.00122,0,0,1,11.31446,0l26.34277,26.34375L176.68848,84,162.34521,69.65674A8.00038,8.00038,0,0,1,168.00244,56h40a8.00039,8.00039,0,0,1,8,8v40a8.00018,8.00018,0,0,1-13.65723,5.65674L188.00244,95.314l-54.34277,54.34327a8.00122,8.00122,0,0,1-11.31446,0L96.00244,123.31348l-56.00293,56.0039V200h184A8.00039,8.00039,0,0,1,231.99951,208Z" />
      </svg>
    </div>
  );
}
