import React from 'react';

export function Table({ children, ...props }) {
  return (
    <div className="w-full overflow-auto rounded-2xl">
      <table className="w-full text-left" {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children, ...props }) {
  return (
    <thead className="bg-[var(--root-color)]" {...props}>
      {React.Children.map(children, (child) =>
        React.cloneElement(child, { noHover: true })
      )}
    </thead>
  );
}

export function TableBody({ children, ...props }) {
  return (
    <tbody className="divide-y divide-[var(--secondary-color)]" {...props}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, noHover, ...props }) {
  const baseClass = noHover ? '' : 'hover:bg-[var(--button-background)]';
  return (
    <tr className={baseClass} {...props}>
      {children}
    </tr>
  );
}

export function TableHead({ children, ...props }) {
  return (
    <th className="p-4 font-medium" {...props}>
      {children}
    </th>
  );
}

export function TableCell({ children, ...props }) {
  return (
    <td className="p-4" {...props}>
      {children}
    </td>
  );
}

export function TableFooter({ children, ...props }) {
  return (
    <tfoot className="bg-gray-100" {...props}>
      {children}
    </tfoot>
  );
}
