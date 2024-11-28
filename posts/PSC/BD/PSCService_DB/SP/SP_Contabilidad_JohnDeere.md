# Stored Procedure: SP_Contabilidad_JohnDeere

## Usa los objetos:
- [[AsientoDesgloses]]
- [[Asientos]]
- [[AsientosDet]]
- [[ContCtas]]

```sql


CREATE procedure [dbo].[SP_Contabilidad_JohnDeere] 
(
@idempresas smallint,
@fechaInicial datetime,
@fechaFinal datetime,
@IdCentros smallint
--@idseccion smallint
)
as

--declare @idempresas smallint
--declare @fechaInicial datetime
--declare @fechaFinal datetime
--declare @IdCentros smallint
--declare @idseccion smallint

--set @idempresas = 1
--set @fechaInicial = '20210101'
--set @fechafinal = '20211101'
--set @IdCentros = 16
--set @idseccion	= 59

Select Cuenta=PkContCtas,Centro=FkCentros, Debe,  Haber, Saldo ,CO,VN,VO,RE,TM,TC,XX, 
Seccion=FkSecciones, Canal=FkVentaCanales, Marca=FkMarcas, Gama=FkGamas
from (
     select PkContCtas,s.FkCentros,sum(s.ImporteDebe) Debe, Sum(s.ImporteHaber) Haber,
         Sum(s.ImporteDebe-s.ImporteHaber) Saldo,
         case when FkDepartamentos='CO' then Sum(s.ImporteDebe-s.ImporteHaber) else 0 end as CO,
         case when FkDepartamentos='VN' then Sum(s.ImporteDebe-s.ImporteHaber) else 0 end as VN,
         case when FkDepartamentos='VO' then Sum(s.ImporteDebe-s.ImporteHaber) else 0 end as VO,
         case when FkDepartamentos='RE' then Sum(s.ImporteDebe-s.ImporteHaber) else 0 end as RE,
         case when FkDepartamentos='TM' then Sum(s.ImporteDebe-s.ImporteHaber) else 0 end as TM,
         case when FkDepartamentos='TC' then Sum(s.ImporteDebe-s.ImporteHaber) else 0 end  as TC,
         case when ISNULL(CHARINDEX(FkDepartamentos, 'VNVOTMTCCORE'),0) <= 0  then Sum(s.ImporteDebe-s.ImporteHaber)else 0 end as XX, 
         ISNULL(s.FkSecciones,'0') FkSecciones,
         ISNULL(s.FkVentaCanales,'0') FkVentaCanales,
         ISNULL(s.FkMarcas,'0') FkMarcas,
         ISNULL(s.FkGamas,'0') FkGamas 
     from		[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[ContCtas]	c
	 LEFT JOIN	[192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientosDet] d		on c.PkContCtas=d.FkContCtas 
																		AND c.PkFkEmpresas = d.PkFkEmpresas
     INNER JOIN [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[Asientos] 	i		on	i.PkAsientos = d.PkFkAsientos 
																		AND i.PkFkEmpresas = d.PkFkEmpresas 
																		AND  i.PkAñoAsiento = d.PkFkAñoAsiento 
     INNER JOIN [192.168.90.10\SPIGAPLUS].[DMS00280].[FI].[AsientoDesgloses] s	on	d.PkFkEmpresas = s.PkFkEmpresas 
																		AND	d.PkFkAñoAsiento = s.PkFKAñoAsiento 
																		AND d.PkFkAsientos = s.PkFkAsientos 
																		AND d.PkAsientosDet_Iden = s.PkFkAsientosDet
   where i.FechaBaja IS NULL
   AND d.FechaBaja IS NULL
   AND s.FechaBaja IS NULL
   AND i.FechaAsiento >= @fechaInicial
   AND i.FechaAsiento < @fechaFinal
   AND i.PkFkEmpresas = @idempresas
   AND s.FkCentros = @IdCentros
   --AND s.FkSecciones  = @idseccion
   AND i.FkAsientoTipos NOT IN ('PE', 'CI')
 group by PkContCtas,s.FkCentros,FkDepartamentos,FkSecciones,FkVentaCanales,FkMarcas,FkGamas
) a order by FkCentros,PkContCtas 





```
