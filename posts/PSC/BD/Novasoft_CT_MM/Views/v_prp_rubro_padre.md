# View: v_prp_rubro_padre

## Usa los objetos:
- [[prp_rubro]]

```sql

 /* =============================================
    Author:		 <OLIVIA ROMERO>
    Description: <Vista para seleccionar los rubros padre para el maestro de Rubros >
    Modificado:  <23 Abr 2020>
    =============================================
*/

CREATE VIEW [dbo].[v_prp_rubro_padre]
AS

SELECT cod_rub,nom_rub,cod_cue,tip_rub 
FROM prp_rubro WITH(NOLOCK)
WHERE ind_mov = 2;


```
