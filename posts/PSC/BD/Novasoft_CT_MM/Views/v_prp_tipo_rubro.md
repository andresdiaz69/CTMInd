# View: v_prp_tipo_rubro

## Usa los objetos:
- [[prp_tipo_rubro]]

```sql

 /* =============================================
    Author:		 <OLIVIA ROMERO>
    Description: <Vista para seleccionar los tipos de rubro para el maestro de Cuentas Funcionamiento >
    Modificado:  <15 Abr 2020>
    =============================================
*/

CREATE VIEW [dbo].[v_prp_tipo_rubro]
AS

SELECT nom_tip,tip_rub 
FROM prp_tipo_rubro WITH (NOLOCK) 
WHERE tip_rub <> 2;


```
