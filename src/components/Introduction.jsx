import React from 'react';

const Introduction = () => {
    return (
        <div className="p-10 space-y-6">
            <h1 className="text-3xl font-bold">Insight Canvas Documentation</h1>
            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Introduction</h2>
                <p>
                    Insight Canvas is a lightweight data visualization application designed to help users create insightful and interactive visualizations effortlessly. This documentation provides an overview of its features, installation steps, and usage instructions.
                </p>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Features</h2>
                <ul className="list-disc pl-6">
                    <li>Supports multiple data formats (CSV, Excel, JSON)</li>
                    <li>Interactive visualizations with filtering and customization</li>
                    <li>Multiple chart types (Bar, Line, Scatter, Pie, etc.)</li>
                    <li>Export visualizations as images or PDFs</li>
                </ul>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Installation</h2>
                <pre className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
                    npm install insight-canvas
                </pre>
                <p>After installation, import the component in your React application:</p>
                <pre className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
                    import InsightCanvas from 'insight-canvas';
                </pre>
            </section>

            <section className="space-y-4">
                <h2 className="text-2xl font-semibold">Usage</h2>
                <pre className="bg-[var(--color-bg-secondary)] p-4 rounded-lg">
                    {`<InsightCanvas
    data={sampleData}
    chartType="bar"
    options={{
        filter: true,
        export: true
    }}
/>`}
                </pre>
            </section>
        </div>
    );
};

export default Introduction;
