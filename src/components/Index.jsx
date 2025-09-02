const Index = ({ onGetStarted }) => {
  return (
    <>
      <section className="text-center p-20 pt-56">
        <h1 className="text-4xl mb-1.5 font-light ">
          Minimalistic Data Visualization
        </h1>
        <p className="text-base text-text-secondary max-w-[600px] mx-auto">
          Simplify your data analysis with our clean and intuitive tools
          designed for clarity and efficiency.
        </p>
        <button
          onClick={onGetStarted}
          className="block my-5 mx-auto px-5 py-3 text-base w-[150px] rounded-lg bg-bg-primary border border-border no-underline text-center"
        >
          Get Started
        </button>
      </section>
      <section className="features flex justify-between px-5 py-10 mx-10 border-t border-border">
        <div className="feature flex-1 mx-2 text-center">
          <h3 className="text-lg mt-2">Interactive Charts</h3>
          <p className="text-text-secondary text-sm mt-1">
            Create elegant, customizable charts that make data easy to
            understand.
          </p>
        </div>
        <div className="feature flex-1 mx-2 text-center">
          <h3 className="text-lg mt-2">Real-Time Updates</h3>
          <p className="text-text-secondary text-sm mt-1">
            View live data as it happens, ensuring you’re always up-to-date.
          </p>
        </div>
        <div className="feature flex-1 mx-2 text-center">
          <h3 className="text-lg mt-2">Secure and Reliable</h3>
          <p className="text-text-secondary text-sm mt-1">
            Trust our platform to keep your data safe and accessible.
          </p>
        </div>
      </section>

      <section className="footer-section absolute inset-x-0 bottom-0 flex justify-center items-center border-t border-border">
        <footer className="px-10 py-5 text-sm text-text-secondary">
          <p>
            &copy; 2025 Insight Canvas. All rights reserved.
            <a href="#terms" className="text-blue-500 hover:underline">
              {" "}
              Terms
            </a>{" "}
            <a href="#privacy" className="text-blue-500 hover:underline">
              {" "}
              Privacy
            </a>
          </p>
        </footer>
      </section>
    </>
  )
}

export default Index
