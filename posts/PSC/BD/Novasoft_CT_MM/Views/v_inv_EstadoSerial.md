# View: v_inv_EstadoSerial

```sql

/* =============================================
    Author:		 <OLIVIA ROMERO>
    Description: <Vista para incluir el descripción del estado de los seriales>
    Creado:      <Octubre 2020>
    =============================================
*/

CREATE VIEW [dbo].[v_inv_EstadoSerial]
AS

SELECT 1 AS cod_est, 'Bodega' AS nom_est
UNION ALL
SELECT 2 AS cod_est, 'Despachado' AS nom_est
UNION ALL
SELECT 3 AS cod_est, 'Vendido' AS nom_est
UNION ALL
SELECT 4 AS cod_est, 'Devuelto' AS nom_est
UNION ALL
SELECT 5 AS cod_est, 'Salida' AS nom_est

```
