import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTransactionHistory } from "../store/UserSlice";
import { useParams } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import moment from "moment/moment";
const Transaction = () => {
  const dispatch = useDispatch();
  const transactionHistory = useSelector((state) => state.user.transaction);
  const offset = useSelector((state) => state.user.offset);
  const limit = useSelector((state) => state.user.limit);
  useEffect(() => {
    dispatch(getTransactionHistory(offset, limit));
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(getTransactionHistory(offset + limit, limit));
  };

  return (
    <section className="flex flex-col mt-8">
      <h5 className="font-semibold">Semua Transaksi</h5>
      <div className="">
        {transactionHistory.map((item) => {
          return (
            <div className="my-2 w-full border rounded-md p-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-4 items-center">
                  <HiPlus className="text-2xl text-green-400" />
                  <span className="text-base text-green-400 font-bold">
                    Rp.{item.total_amount}
                  </span>
                </div>
                <div>
                  <span className="text-sm lowercase">
                    {item.transaction_type}
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400 ml-3 mt-2">
                  {moment(item.created_on).format("DD MMM YYYY, HH:mm")} WIB
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="text-center my-4 text-red-500 font-semibold"
        onClick={handleShowMore}
      >
        Show more
      </button>
    </section>
  );
};

export default Transaction;
