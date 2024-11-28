# Stored Procedure: MLC_Consulta_Codigo_Spiga

## Usa los objetos:
- [[rhh_emplea]]

```sql
create  PROCEDURE [dbo].[MLC_Consulta_Codigo_Spiga] 
@cod_reloj int
as
select cod_emp,nombres= nom_emp + ' ' + ap1_emp + ' ' + ap2_emp,cod_reloj
from rhh_emplea
where cod_reloj = @cod_reloj
```
