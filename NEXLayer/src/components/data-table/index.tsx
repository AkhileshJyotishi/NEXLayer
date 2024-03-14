import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination,
} from "react-table";
import React, { useMemo,  useCallback, useEffect } from "react";
import rewardData from "@/data/reward.json";
import {
  FaSearch,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";
import Image from "next/image";
import Button from "../ui/button";
import { ethers } from "ethers";
declare var window: any
import stakeData from '@/data/stake.json';
import { toast } from "react-toastify";








  interface GlobalSearchFilterProps {
    globalFilter: string;
    setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
    className?: string;
  }
  
  const GlobalSearchFilter: React.FC<GlobalSearchFilterProps> = ({
    globalFilter,
    setGlobalFilter,
    className = "",
  }) => {
    return (
      <InputGroup
        name="search"
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        label="Search"
        decoration={<FaSearch size="1rem" className="text-gray-400" />}
        className={className}
      />
    );
  };

  interface InputGroupProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    decoration: React.ReactNode;
    className?: string;
    inputClassName?: string;
    decorationClassName?: string;
    disabled?: boolean;
  }
  
  const InputGroup: React.FC<InputGroupProps> = ({
    label,
    name,
    value,
    onChange,
    decoration,
    className = "",
    inputClassName = "",
    decorationClassName = "",
    disabled,
  }) => {
    return (
      <div className={`flex flex-row-reverse items-stretch w-full rounded-xl overflow-hidden bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] ${className}`}>
        <input
          id={name}
          name={name}
          value={value}
          placeholder={label}
          aria-label={label}
          onChange={onChange}
          className={`peer block w-full p-3 text-gray-600  appearance-none ${disabled ? "bg-gray-200" : ""} ${inputClassName}`}
          disabled={disabled}
        />
        <div
          className={`flex items-center pl-3 py-3 text-gray-600 ${disabled ? "bg-gray-200" : ""} ${decorationClassName}`}
        >
          {decoration}
        </div>
      </div>
    );
  };
    


interface TableComponentProps {
    tableInstance: any;
  }
  
  const TableComponent: React.FC<TableComponentProps> = ({ tableInstance }) => {
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      rows,
    } = tableInstance as any;
  
    return (
      <div className="w-full min-w-[30rem] p-4  rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] invert  ">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup:any) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column:any) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-3 text-start text-xs font-light uppercase cursor-pointer"
                    style={{ width: column.width }}
                  >
                    <div className="flex gap-2 items-center justify-center">
                      <div className="text-gray-600">
                        {column.render("Header")}
                      </div>
                      <div className="flex flex-col">
                        <FaSortUp
                          className={`text-sm translate-y-1/2 ${
                            column.isSorted && !column.isSortedDesc
                              ? "text-red-400"
                              : "text-gray-300"
                          }`}
                        />
                        <FaSortDown
                          className={`text-sm -translate-y-1/2 ${
                            column.isSortedDesc ? "text-red-400" : "text-gray-300"
                          }`}
                        />
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row:any, i:any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} className="hover:bg-gray-100">
                  {row.cells.map((cell:any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="p-3 text-sm font-normal text-gray-700 first:rounded-l-lg last:rounded-r-lg text-center"
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };


const Table1: React.FC = () => {
    const data = useMemo(() => generateData(), []);
    const columns = useMemo(getColumns, []);
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      state,
      setGlobalFilter,
      page: rows,
    } = useTable<any>(
      {
        columns,
        data,
        initialState: { pageSize: 5 },
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    ) as unknown as any;
  
    return (
      <div className="flex flex-col gap-4 w-full">
        <div className="flex  text-blackflex-col sm:flex-row justify-between gap-2 invert w-11/12 mx-auto">
          <GlobalSearchFilter
            className="sm:w-64"
            globalFilter={state.globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        
        </div>
        <TableComponent
          tableInstance={{
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            rows,
          }}
        />
      
      </div>
    );
  };

const generateData = () =>
{
  return rewardData;
}
const getColumns = () => [
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Remaining Time",
    accessor: "accountNumber",
  },
  {
    Header: "Claimed Date",
    accessor: "claimedDate",
  },
  {
    Header: "Claim",
    accessor: "claim",
    Cell: ({ row }:{row:any}) => (
      <Button  variant="shimmer" className="bg-white invert" onClick={() => handleClaim(row)}>Claim</Button>
    ),
  }

];

const handleClaim = (row:any) => {
  const arr:string[]=[]
  row.cells.map((cell:any) => {
    if(cell.value!==undefined) arr.push(cell.value)
  })
handleClaimCFX(arr)

console.log("CHECK ",arr)
  // Handle claim action here
};

const handleClaimCFX = async (arr:string[]) => {
  // handle unstake CFX
  try {
    if(window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();

        const contract = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);

        const amountWei = ethers.utils.parseEther(arr[0].toString());
        
        const transaction = await contract.withdraw(amountWei);  
       
        await listenForTransactionMined(transaction, provider);
        console.log("Unstaked successfully !!!");

    }else{
        console.log("Please Connect Wallet !!!")
    }
} catch (error) {
    toast.warning("Please enter the amount to unstake1");
    
}
}
function listenForTransactionMined(transactionResponse: any, provider: any) {
  try {
    //listen for this transaction to be finished
    return new Promise((resolve, reject) => {
      provider.once(transactionResponse.hash, (transactionReciept: any) => {
        console.log(`Completed with ${transactionReciept.confirmations}`);
        resolve(transactionReciept);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

function Table1Presentation() {
  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      
      const contractRestake = new ethers.Contract(stakeData.addressStake, stakeData.abiStake, signer);
      const filter = contractRestake.filters.WithdrewStake();
      window.addEventListener("WithdrewStake", (e:any) => {
        console.log(e);
      })  
      contractRestake.on(filter, (event) => {
        // Handle the received event data
        console.log("wroking ")
        console.log(event);
      })
     
    }
  }, []);
  return (
    <div className="flex flex-col  py-4 sm:py-0 mt-8 overflow-y-scroll w-full grow h-[200px] max-h-[500px]">
      <Table1 />
    </div>
  );
}

export { Table1Presentation };

