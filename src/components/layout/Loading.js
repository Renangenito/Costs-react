import React from 'react';
import styles from '../layout/Loading.module.css'
import loading from '../img/loading.svg'
function Loading(){
    return(
        <div className={styles.loader_container}>
            <img className={styles.loader} src={loading} />
        </div>
    )
}
export default Loading;