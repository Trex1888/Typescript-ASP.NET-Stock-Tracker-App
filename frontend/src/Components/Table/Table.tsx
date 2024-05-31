type Props = {
  config: any;
  data: any;
};

const Table = ({ config, data }: Props) => {
  const renderedRows = data.map((company: any) => {
    return (
      <tr key={company.cik}>
        {config.map((val: any, index: number) => (
          <td key={index} className="p-3">
            {val.render(company)}
          </td>
        ))}
      </tr>
    );
  });

  const renderedHeaders = config.map((config: any, index: number) => (
    <th
      key={index}
      className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      {config.label}
    </th>
  ));

  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">
          <tr>{renderedHeaders}</tr>
        </thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;
