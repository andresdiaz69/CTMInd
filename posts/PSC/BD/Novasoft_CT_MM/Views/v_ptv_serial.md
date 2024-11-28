# View: v_ptv_serial

## Usa los objetos:
- [[gen_cajas]]
- [[v_inv_serial]]

```sql

-- 2020/01/23 Inclusión Instrucción WITH (NOLOCK)
CREATE VIEW [dbo].[v_ptv_serial]
AS
SELECT        ser.cod_serie, ser.cod_item, ser.des_item, ser.cod_bodega, caj1.cod_caj AS caja
FROM            dbo.v_inv_serial AS ser WITH (NOLOCK) INNER JOIN
                         dbo.gen_cajas AS caj1 WITH (NOLOCK) ON ser.cod_bodega = caj1.cod_bod

```
