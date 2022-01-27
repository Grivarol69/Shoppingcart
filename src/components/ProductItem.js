import styles from './Products.module.css';

export const ProductItem = ({data, addToCart}) => {
    
    const { id, name, price } = data;

    return (
        <div className={ styles.products }>
            <h4>{ name }</h4>
            <h5>$ { price }.00</h5>
            <button onClick={() => addToCart(id)}>Agregar al Carrito</button>
        </div>
    )}


