# Stored Procedure: sp_ExcesosExcesivos_Descripcion

## Usa los objetos:
- [[spiga_StockRepuestos_18_SinTraspaso]]
- [[UnidadDeNegocio]]

```sql
CREATE PROCEDURE [dbo].[sp_ExcesosExcesivos_Descripcion] 
(
	@Ano_Periodo int,
	@Mes_Periodo int,
	@CodUnidadNegocio nvarchar(10)
)
AS

BEGIN 
--declare @Ano_Periodo int ,@Mes_Periodo int,@CodUnidadNegocio nvarchar(10)
--set @Ano_Periodo = YEAR(GETDATE())
--set @Mes_Periodo = 9
--set @CodUnidadNegocio = '19'

SELECT IdEmpresas,CodUnidadNegocio, Marca,IdClasificacion, UPPER(DenominacionClasificacion) DenominacionClasificacion
FROM
(
	SELECT distinct IdEmpresas, CodUnidadNegocio,Marca=NombreUnidadNegocio,IdClasificacion2 AS IdClasificacion, DenominacionClasificacion2 AS DenominacionClasificacion
	FROM        
	(
		select Ano_Periodo,Mes_Periodo,IdEmpresas,IdClasificacion2,DenominacionClasificacion2,IdClasificacion4,
			DenominacionClasificacion4,CodUnidadNegocio,NombreUnidadNegocio
		from
		(
			select Ano_Periodo,Mes_Periodo,IdEmpresas,IdClasificacion2,DenominacionClasificacion2,IdClasificacion4,
				DenominacionClasificacion4,CodUnidadNegocio,NombreUnidadNegocio
			from
			(
				select Ano_Periodo,Mes_Periodo,IdEmpresas,IdClasificacion2,DenominacionClasificacion2,
					IdClasificacion4,DenominacionClasificacion4,u.CodUnidadNegocio,NombreUnidadNegocio
				from [PSCService_DB].dbo.spiga_StockRepuestos_18_SinTraspaso	v
				left join	UnidadDeNegocio							u	on	v.IdSecciones = u.CodSeccion
				where Ano_Periodo = @Ano_Periodo
				--and Mes_Periodo = 9
			)a
		)a
		group by Ano_Periodo,Mes_Periodo,IdEmpresas,CodUnidadNegocio,NombreUnidadNegocio,IdClasificacion2,
			DenominacionClasificacion2,IdClasificacion4,DenominacionClasificacion4
	)
	s
	where NombreUnidadNegocio <> 'Mazda'
	and IdClasificacion2 is not null
	--order by IdEmpresas,marca

	union all

	SELECT distinct IdEmpresas, CodUnidadNegocio,Marca=NombreUnidadNegocio,IdClasificacion4 AS IdClasificacion, DenominacionClasificacion4 AS DenominacionClasificacion
	FROM        
	(
		select Ano_Periodo,Mes_Periodo,IdEmpresas,IdClasificacion2,DenominacionClasificacion2,IdClasificacion4,
			DenominacionClasificacion4,CodUnidadNegocio,NombreUnidadNegocio
		from
		(
			select Ano_Periodo,Mes_Periodo,IdEmpresas,IdClasificacion2,DenominacionClasificacion2,IdClasificacion4,
				DenominacionClasificacion4,CodUnidadNegocio,NombreUnidadNegocio
			from
			(
				select Ano_Periodo,Mes_Periodo,IdEmpresas,IdClasificacion2,DenominacionClasificacion2,
				IdClasificacion4,DenominacionClasificacion4,u.CodUnidadNegocio,NombreUnidadNegocio
				from [PSCService_DB].dbo.spiga_StockRepuestos_18_SinTraspaso	v
				left join	UnidadDeNegocio							u	on	v.IdSecciones = u.CodSeccion
				where Ano_Periodo = @Ano_Periodo
				--and Mes_Periodo = 9
			)a
		)a
		group by Ano_Periodo,Mes_Periodo,IdEmpresas,CodUnidadNegocio,NombreUnidadNegocio,IdClasificacion2,
			DenominacionClasificacion2,IdClasificacion4,DenominacionClasificacion4
	)	s
	where NombreUnidadNegocio = 'Mazda'
	and IdClasificacion4 is not null
)A
WHERE CodUnidadNegocio = @CodUnidadNegocio
--order by IdEmpresas,marca
END

```
