const LoadingPage = () => {
  return (
    <div className="text-center loadingContainer">
      <div
        className="spinner-border spinner-size"
        style={{ width: 50, height: 50 }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingPage;
