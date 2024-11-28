# Stored Procedure: sp_GMF_TotalPlano_JD

## Usa los objetos:
- [[GMF_16_ValorGMFPorCentro]]
- [[GMF_ArchivoPlano_JD]]
- [[GMF_SedesParametros]]
- [[v_GMF_1_ValorMensualGMF_USC]]

```sql



CREATE PROCEDURE [dbo].[sp_GMF_TotalPlano_JD]
@anio varchar(5), @mes varchar(5), @empresa int

AS
BEGIN


declare @mydate datetime
set @mydate = concat(@anio,'-',1,'-',@mes)

TRUNCATE TABLE GMF_ArchivoPlano_JD 
INSERT INTO GMF_ArchivoPlano_JD 

SELECT *
FROM (
select FORMAT(EOMONTH( @mydate ), 'yyyyMMdd') as FechaAsiento, 'OV' as TipoAsiento, 
concat('REG. ', UPPER(SUBSTRING(datename(month, @mydate),0,4)), ' GMF') as ConceptoAsiento,
'' AS TipoOperacion, '5215955005' as Cuenta,'H' as 'Debe/Haber',
CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(Valor  AS MONEY),1))as Importe, 
'' as Entidad, CASE WHEN IdEmpresas = 1 THEN '2' WHEN IdEmpresas = 6 THEN '249195' END AS 'Tercero',
'' as CuentaBancaria,ISNULL(CASE WHEN b.Centro IS NULL THEN a.centro ELSE b.Centro END,'') AS Centro, 
ISNULL(b.Departamento,'') AS Departamento,
ISNULL(b.Seccion,'') AS Seccion , ISNULL( b.Marca,'') AS Marca,
'' as Gama, '' as MR, '' as Clasificacion1, '' as Referencia, '' as CanaldeVenta, 
'' as CanaldeCompra, '' as ConceptoBancario , '' as Moneda, '' as FactorCambio,
GETDATE() AS FechaGeneracion
FROM v_GMF_1_ValorMensualGMF_USC  as a 
left join GMF_SedesParametros as b on 
a.centro = b.Centro
where año = @anio and Mes = @mes and IdEmpresas = @empresa

union all

select DISTINCT FORMAT(EOMONTH( @mydate ), 'yyyyMMdd') as FechaAsiento, 'OV' as TipoAsiento, 
concat('REG. ', UPPER(SUBSTRING(datename(month, @mydate),0,4)), ' GMF') as ConceptoAsiento,
'' AS TipoOperacion, '5215955005' as Cuenta,'D' as 'Debe/Haber',
CONVERT(VARCHAR, CONVERT(VARCHAR, CAST(ValorGMFPorCentro  AS MONEY),1))as Importe, 
'' as Entidad, CASE WHEN a.Empresa = 1 THEN '2' WHEN a.Empresa = 6 THEN '249195' END AS 'Tercero',
'' as CuentaBancaria,ISNULL(b.Centro,'') AS Centro, ISNULL(b.Departamento,'') AS Departamento,
ISNULL(b.Seccion,'') AS Seccion , ISNULL( b.Marca,'') AS Marca,
'' as Gama, '' as MR, '' as Clasificacion1, '' as Referencia, '' as CanaldeVenta, 
'' as CanaldeCompra, '' as ConceptoBancario , '' as Moneda, '' as FactorCambio,
GETDATE() AS FechaGeneracion
from GMF_16_ValorGMFPorCentro as a 
inner join GMF_SedesParametros as b on 
a.Nombrepresentacion = b.UnidadNegocio
--and a.Empresa = b.Empresa
and a.sede = b.Sede
and a.CodigoConcepto = b.CodigoConcepto
where año = @anio and Mes = @mes and a.Empresa = @empresa
AND CodigoPresentacion = 1
) AS A

SELECT * FROM GMF_ArchivoPlano_JD

END

```
