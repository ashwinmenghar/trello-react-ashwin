import { useEffect, useState } from "react";
import { Box, Container } from "@chakra-ui/react";
import CardList from "./CardList";
import Error from "../Error";
import Loading from "../Loading";
import AddList from "./AddList";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchCards } from "../../redux/slices/cards/thunks/cardsThunks";
import { Card } from "../../types/Card";

const BoardCardLists = () => {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { id } = useParams();
  const { cards } = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch<AppDispatch>();

  const fetchBoardsData = async (boardId: number) => {
    try {
      setLoading(true);
      await dispatch(fetchCards(boardId)).unwrap();
    } catch (error: any) {
      setError(error?.message ?? error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchBoardsData(Number(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleCardClick = (cardId: number | null) => {
    setActiveCardId((prevId) => (prevId === cardId ? null : cardId));
  };

  return (
    <>
      {error && <Error error={error} />}
      {loading && <Loading />}

      {!loading && !error && (
        <Container mt="100px">
          <Box display="flex" gap={5} w="fit">
            {cards.map((list: Card) => (
              <CardList
                key={list.id}
                list={list}
                isActive={activeCardId === list.id}
                onCardClick={handleCardClick}
              />
            ))}

            <AddList boardId={Number(id)} />
          </Box>
        </Container>
      )}
    </>
  );
};

export default BoardCardLists;
