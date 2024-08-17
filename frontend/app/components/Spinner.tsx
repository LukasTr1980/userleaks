export default function Spinner() {
    //debugger;
    return (
        <div className="flex items-center justify-center mt-20">
            <div
                className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"
                role="status"
                aria-label="Loading"
            />
        </div>
    );
}
