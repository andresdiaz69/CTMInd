# Stored Procedure: sp_CuadroDePersonal_JuntaDirectivaMM_AG

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE PROCEDURE [dbo].[sp_CuadroDePersonal_JuntaDirectivaMM_AG]
	-- Add the parameters for the stored procedure here
	@AnoActual as int,
	@MesActual as int

AS

--declare	@AnoActual as int
--declare @MesActual as int
--set @AnoActual =2023
--set @MesActual = 10

BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	Declare @MesAnterior as smallint
	Declare @AñoAnterior as smallint

	if @MesActual = 1 
	Begin
		set @MesAnterior = 12 
		set @AñoAnterior = @AnoActual - 1
		end
	else
	begin
		set @MesAnterior = @MesActual - 1
		set @AñoAnterior = @AnoActual 
		end

-- Insert statements for procedure here
select Nombre_Cargo_Junta,	Nombre_Unidad_Negocio, 	Cantidad_Actual= sum(Cantidad_Actual), Cantidad_Anterior=sum(Cantidad_Anterior), AñoAnterior=sum(AñoAnterior)
from(
	SELECT Nombre_Cargo_Junta, 
	Nombre_Unidad_Negocio=  case when Nombre_Unidad_Negocio = 'DAIMLER PC (VEHICULOS PASAJEROS)' then 'MERCEDES-BENZ' else Nombre_Unidad_Negocio end, 
	Cantidad_Actual, Cantidad_Anterior, AñoAnterior
	FROM
	(
		SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, Cantidad_Actual, Cantidad_Anterior, AñoAnterior
		FROM
		(
			SELECT RTRIM(LTRIM(ISNULL(MesActual.Nombre_Cargo_Junta,MesAnterior.Nombre_Cargo_Junta))) AS Nombre_Cargo_Junta,
				RTRIM(LTRIM(ISNULL(MesActual.Nombre_Unidad_Negocio,MesAnterior.Nombre_Unidad_Negocio))) AS Nombre_Unidad_Negocio,
				Isnull(MesActual.Cantidad,0) as Cantidad_Actual, Isnull(MesAnterior.Cantidad,0) as Cantidad_Anterior, 
				Isnull(AñoAnterior.Cantidad,0) AS AñoAnterior
				FROM 
				(
					SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
					FROM EmpleadosActivos
					WHERE CodigoEmpresa = 6 AND Mes_Periodo = @MesActual  AND Ano_Periodo = @AnoActual --AND codigo_centro not in (84, 108)
					GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio
				)AS MesActual

			FULL OUTER JOIN 
				(
					SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
					FROM EmpleadosActivos
					WHERE CodigoEmpresa = 6 AND Mes_Periodo = @MesAnterior AND Ano_Periodo = @AñoAnterior 
					--and codigo_centro not in (84, 108)
					GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio
				)AS MesAnterior

			ON MesActual.Nombre_Cargo_Junta = MesAnterior.Nombre_Cargo_Junta 
			AND MesActual.Nombre_Unidad_Negocio = MesAnterior.Nombre_Unidad_Negocio LEFT JOIN 

			(SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio=  case when Nombre_Unidad_Negocio = 'DAIMLER PC (VEHICULOS PASAJEROS)' then 'MERCEDES-BENZ' else Nombre_Unidad_Negocio end, 
			 count(*) [Cantidad]
				FROM v_EmpleadosActivosRetirados
				WHERE CodigoEmpresa = 6 AND Mes_Periodo = @MesActual AND Ano_Periodo = @AnoActual - 1 
				--and codigo_centro not in (84, 108)
				GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio) as AñoAnterior 

			ON MesActual.Nombre_Cargo_Junta = AñoAnterior.Nombre_Cargo_Junta 
			AND MesActual.Nombre_Unidad_Negocio = AñoAnterior.Nombre_Unidad_Negocio 
			--order by MesActual.Nombre_Cargo_Junta,MesActual.Nombre_Unidad_Negocio
		) A

		--UNION ALL

		--SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio = 'MAYORISTA', Cantidad_Actual, Cantidad_Anterior, AñoAnterior
		--FROM
		--(
		--	SELECT RTRIM(LTRIM(ISNULL(MesActual.Nombre_Cargo_Junta,MesAnterior.Nombre_Cargo_Junta))) AS Nombre_Cargo_Junta,
		--		RTRIM(LTRIM(ISNULL(MesActual.Nombre_Unidad_Negocio,MesAnterior.Nombre_Unidad_Negocio))) AS Nombre_Unidad_Negocio,
		--		Isnull(MesActual.Cantidad,0) as Cantidad_Actual, Isnull(MesAnterior.Cantidad,0) as Cantidad_Anterior, 
		--		Isnull(AñoAnterior.Cantidad,0) AS AñoAnterior
		--		FROM 
		--		(
		--			SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
		--			FROM EmpleadosActivos
		--			WHERE CodigoEmpresa = 6 AND Mes_Periodo = @MesActual  AND Ano_Periodo = @AnoActual AND codigo_centro IN (84, 108)
		--			GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio
		--		)AS MesActual

		--	FULL OUTER JOIN 
		--	   (
		--			SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
		--			FROM EmpleadosActivos
		--			WHERE CodigoEmpresa = 6 AND Mes_Periodo = @MesAnterior AND Ano_Periodo = @AñoAnterior AND codigo_centro IN (84, 108)
		--			GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio
		--		)AS MesAnterior

		--	ON MesActual.Nombre_Cargo_Junta = MesAnterior.Nombre_Cargo_Junta 
		--	AND MesActual.Nombre_Unidad_Negocio = MesAnterior.Nombre_Unidad_Negocio LEFT JOIN 

		--	(SELECT Nombre_Cargo_Junta, Nombre_Unidad_Negocio=  case when Nombre_Unidad_Negocio = 'DAIMLER PC (VEHICULOS PASAJEROS)' then 'MERCEDES-BENZ' else Nombre_Unidad_Negocio end, 
		--	count(*) [Cantidad]
		--		FROM v_EmpleadosActivosRetirados
		--		WHERE CodigoEmpresa = 6 AND Mes_Periodo = @MesActual AND Ano_Periodo = @AnoActual - 1 AND codigo_centro IN (84, 108)
		--		GROUP BY Nombre_Cargo_Junta,Nombre_Unidad_Negocio) as AñoAnterior 

		--	ON MesActual.Nombre_Cargo_Junta = AñoAnterior.Nombre_Cargo_Junta 
		--	AND MesActual.Nombre_Unidad_Negocio = AñoAnterior.Nombre_Unidad_Negocio 
		--) B
	) C 
)D group by Nombre_Cargo_Junta,	Nombre_Unidad_Negocio

ORDER BY Nombre_Cargo_Junta, Nombre_Unidad_Negocio
END

```
