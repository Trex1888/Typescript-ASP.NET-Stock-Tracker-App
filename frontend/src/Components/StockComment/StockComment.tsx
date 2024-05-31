import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../Spinners/Spinner";
import StockCommentList from "../StockCommentList/StockCommentList";
import { CommentGet } from "../../Models/Comment";
import StockCommentForm from "./StockCommentForm/StockCommentForm";
import { commentGetAPI, commentPostAPI } from "../../Services/CommentService";

type Props = {
  stockSymbol: string;
};

type CommentFormInputs = {
  title: string;
  content: string;
};

const StockComment = ({ stockSymbol }: Props) => {
  const [comments, setComment] = useState<CommentGet[] | null>(null);
  const [loading, setLoading] = useState<boolean>();

  const getComments = useCallback(() => {
    setLoading(true);
    commentGetAPI(stockSymbol).then((res) => {
      setLoading(false);
      setComment(res?.data!);
    });
  }, [stockSymbol]); // Memoize getComments and add stockSymbol as dependency

  useEffect(() => {
    getComments();
  }, [getComments]); // Add getComments to the dependency array

  const handleComment = (e: CommentFormInputs) => {
    commentPostAPI(e.title, e.content, stockSymbol)
      .then((res) => {
        if (res) {
          toast.success("Comment created successfully!");
          getComments();
        }
      })
      .catch((e) => {
        toast.warning(e);
      });
  };

  return (
    <div className="flex flex-col">
      {loading ? <Spinner /> : <StockCommentList comments={comments!} />}
      <StockCommentForm symbol={stockSymbol} handleComment={handleComment} />
    </div>
  );
};

export default StockComment;
