# View: v_validacion_cod_reloj_doble

## Usa los objetos:
- [[rhh_emplea]]

```sql
create  view [dbo].[v_validacion_cod_reloj_doble] as
SELECT isnull(ROW_NUMBER() OVER (ORDER BY cod_reloj), 0) AS id,       cod_reloj, COUNT(cod_reloj) AS cant
FROM            dbo.rhh_emplea AS e
WHERE        (fec_egr is null or fec_egr > GETDATE()) AND (ap2_emp NOT LIKE '%anulado%')
GROUP BY cod_reloj
HAVING        (COUNT(cod_reloj) > 1)

```
