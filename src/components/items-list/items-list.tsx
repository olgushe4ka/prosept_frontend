import styles from "./items-list.module.css";

interface ItemFromItemsListProps {
  item: string;
}

const ItemFromItemsList: React.FC<ItemFromItemsListProps> = ({ item }) => {
  return <div className={styles.main}>{item}</div>;
};

export default ItemFromItemsList;
