# View: v_odp_clases

```sql

/* =============================================
    Author:         <OLIVIA ROMERO>
    Description: <Vista para incluir la descripción de la clase de los items>
    Modificado:  <17 Mar 2020>
    =============================================
*/

CREATE VIEW [dbo].[v_odp_clases]
AS

SELECT 1 AS cod_clase, 'Material Directo' AS nom_clase
UNION ALL
SELECT 2 AS cod_clase, 'Mano de Obra Directa' AS nom_clase
UNION ALL
SELECT 3 AS cod_clase, 'Mano de Obra Indirecta' AS nom_clase
UNION ALL
SELECT 4 AS cod_clase, 'Costos Indirectos de Fabricación' AS nom_clase
UNION ALL
SELECT 5 AS cod_clase, 'Máquina' AS nom_clase;

```
