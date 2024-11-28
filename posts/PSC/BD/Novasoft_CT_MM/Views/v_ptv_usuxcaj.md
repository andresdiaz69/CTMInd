# View: v_ptv_usuxcaj

## Usa los objetos:
- [[fn_sis_GetUsuActual]]
- [[gen_cajas]]
- [[ptv_usucaj]]

```sql

-- 2020/01/23: SNR2020-0004 Cambio Función de Usuario, se agrega WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_usuxcaj]
AS

SELECT cod_caj,nom_caj,cod_usu FROM gen_cajas AS CAJ WITH (NOLOCK) INNER JOIN ptv_usucaj AS USU WITH (NOLOCK) ON CAJ.cod_caj=USU.cod_caja
WHERE cod_usu= dbo.fn_sis_GetUsuActual();

```
