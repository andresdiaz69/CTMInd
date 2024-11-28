# Stored Procedure: sp_Distribucion_CostoTotalSinRepuestos

## Usa los objetos:
- [[InformesDefinitivos]]
- [[InformesPresentaciones]]

```sql

CREATE PROCEDURE sp_Distribucion_CostoTotalSinRepuestos
@AÑO INT,
@MES INT
AS
BEGIN
--SET FMTONLY OFF
SET NOCOUNT ON

select Año2,MesFinal2,CodigoConcepto,NombreConcepto,ActualTotal
from InformesDefinitivos              i​
left join InformesPresentaciones  p      on     i.CodigoPresentacion = p.CodigoPresentacion​
where i.CodigoPresentacion = 31​
and año2 = @AÑO                -----El Año depende del año que se este procesando
and mesfinal2 = @MES              -----El mes depende del mes que se este procesando
and Balance = 17​
and MesFinal1 <> MesFinal2​
and i.CodigoConcepto = 99 ​
order by i.codigoPresentacion,orden​
END

```
