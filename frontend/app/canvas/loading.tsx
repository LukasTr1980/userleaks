export default function Loading() {
    //debugger;
    return (
        <div className="flex left-2">
            <div
                className="animate-spin rounded-full h-4 w-4 border-t-4 border-gray-500"
                role="status"
                aria-label="Loading"
            />
        </div>
    );
}
