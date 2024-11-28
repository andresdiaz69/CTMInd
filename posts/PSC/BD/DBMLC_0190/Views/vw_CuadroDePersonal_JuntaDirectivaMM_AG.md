# View: vw_CuadroDePersonal_JuntaDirectivaMM_AG

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_JuntaDirectivaMM_AG]
--MS:161123 vista del procedimiento sp_CuadroDePersonal_JuntaDirectivaMM_AG para poder filtrar la informacion
AS

select Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta,	Nombre_Unidad_Negocio, 	Cantidad_Actual= sum(Cantidad_Actual), Cantidad_Anterior=sum(Cantidad_Anterior), AñoAnterior=sum(AñoAnterior)
from(
	SELECT Nombre_Cargo_Junta, Ano_Periodo,Mes_Periodo,
	Nombre_Unidad_Negocio=  case when Nombre_Unidad_Negocio = 'DAIMLER PC (VEHICULOS PASAJEROS)' then 'MERCEDES-BENZ' else Nombre_Unidad_Negocio end, 
	Cantidad_Actual, Cantidad_Anterior, AñoAnterior
	FROM
	(
		SELECT Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta, Nombre_Unidad_Negocio, Cantidad_Actual, Cantidad_Anterior, AñoAnterior
		FROM
		(
			SELECT isnull(mesactual.Ano_Periodo,MesAnterior.Ano_Periodo) Ano_Periodo,isnull(mesactual.Mes_Periodo,MesAnterior.Mes_Periodo)Mes_Periodo, RTRIM(LTRIM(ISNULL(MesActual.Nombre_Cargo_Junta,MesAnterior.Nombre_Cargo_Junta))) AS Nombre_Cargo_Junta,
				RTRIM(LTRIM(ISNULL(MesActual.Nombre_Unidad_Negocio,MesAnterior.Nombre_Unidad_Negocio))) AS Nombre_Unidad_Negocio,
				Isnull(MesActual.Cantidad,0) as Cantidad_Actual, Isnull(MesAnterior.Cantidad,0) as Cantidad_Anterior,	
				Isnull(AñoAnterior.Cantidad,0) AS AñoAnterior
				FROM 
				(
					SELECT Ano_Periodo,Mes_Periodo, Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
					FROM EmpleadosActivos
					WHERE CodigoEmpresa = 6 
					  --AND Mes_Periodo = 12
					  --AND Ano_Periodo = 2022
					  AND codigo_centro not in (84, 108)
					GROUP BY Ano_Periodo,Mes_Periodo, Nombre_Cargo_Junta,Nombre_Unidad_Negocio
				)AS MesActual

			FULL OUTER JOIN 
				(
					SELECT case when Mes_Periodo=12 then 1 else Mes_Periodo+1 end Mes_Periodo,
                           case when Mes_Periodo = 12 then  Ano_Periodo+1 else Ano_Periodo end Ano_Periodo,
						   Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
					FROM EmpleadosActivos
					WHERE CodigoEmpresa = 6 
					--AND Mes_Periodo = 11
					--AND Ano_Periodo = 2022
					and codigo_centro not in (84, 108)
					GROUP BY Ano_Periodo,Mes_Periodo, Nombre_Cargo_Junta,Nombre_Unidad_Negocio
				)AS MesAnterior

			ON MesActual.Nombre_Cargo_Junta = MesAnterior.Nombre_Cargo_Junta 
			AND MesActual.Nombre_Unidad_Negocio = MesAnterior.Nombre_Unidad_Negocio 
			and MesActual.Ano_Periodo = MesAnterior.Ano_Periodo
			and MesActual.Mes_Periodo = MesAnterior.Mes_Periodo
			
			LEFT JOIN 

			(SELECT Mes_Periodo,Ano_Periodo+1 Ano_Periodo,Nombre_Cargo_Junta, Nombre_Unidad_Negocio=  case when Nombre_Unidad_Negocio = 'DAIMLER PC (VEHICULOS PASAJEROS)' then 'MERCEDES-BENZ' else Nombre_Unidad_Negocio end, 
			 count(*) [Cantidad]
				FROM v_EmpleadosActivosRetirados
				WHERE CodigoEmpresa = 6 
				--AND Mes_Periodo = 12
				--AND Ano_Periodo = 2023- 1 
				and codigo_centro not in (84, 108)
				GROUP BY Mes_Periodo, Ano_Periodo,Nombre_Cargo_Junta,Nombre_Unidad_Negocio) as AñoAnterior 

			ON MesActual.Nombre_Cargo_Junta = AñoAnterior.Nombre_Cargo_Junta 
			AND MesActual.Nombre_Unidad_Negocio = AñoAnterior.Nombre_Unidad_Negocio 
			and MesActual.Ano_Periodo = AñoAnterior.Ano_Periodo
			and MesActual.Mes_Periodo = AñoAnterior.Mes_Periodo
			--order by MesActual.Nombre_Cargo_Junta,MesActual.Nombre_Unidad_Negocio
		) A

		UNION ALL

		SELECT Ano_Periodo,Mes_Periodo, Nombre_Cargo_Junta, Nombre_Unidad_Negocio = 'MAYORISTA', Cantidad_Actual, Cantidad_Anterior, AñoAnterior
		FROM
		(
			SELECT isnull(mesactual.Ano_Periodo,MesAnterior.Ano_Periodo) Ano_Periodo,isnull(mesactual.Mes_Periodo,MesAnterior.Mes_Periodo)Mes_Periodo, RTRIM(LTRIM(ISNULL(MesActual.Nombre_Cargo_Junta,MesAnterior.Nombre_Cargo_Junta))) AS Nombre_Cargo_Junta,
				RTRIM(LTRIM(ISNULL(MesActual.Nombre_Unidad_Negocio,MesAnterior.Nombre_Unidad_Negocio))) AS Nombre_Unidad_Negocio,
				Isnull(MesActual.Cantidad,0) as Cantidad_Actual, Isnull(MesAnterior.Cantidad,0) as Cantidad_Anterior, 
				Isnull(AñoAnterior.Cantidad,0) AS AñoAnterior
				FROM 
				(
					SELECT Ano_Periodo,Mes_Periodo, Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
					FROM EmpleadosActivos
					WHERE CodigoEmpresa = 6 
					--AND Mes_Periodo = 12
					--AND Ano_Periodo = 2023
					AND codigo_centro IN (84, 108)
					GROUP BY Ano_Periodo,Mes_Periodo,  Nombre_Cargo_Junta,Nombre_Unidad_Negocio
				)AS MesActual

			FULL OUTER JOIN 
			   (
					SELECT case when Mes_Periodo=12 then 1 else Mes_Periodo+1 end Mes_Periodo,
                           case when Mes_Periodo = 12 then  Ano_Periodo+1 else Ano_Periodo end Ano_Periodo,Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
					FROM EmpleadosActivos
					WHERE CodigoEmpresa = 6 
					--AND Mes_Periodo = 11
					--AND Ano_Periodo = 22
					AND codigo_centro IN (84, 108)
					GROUP BY Ano_Periodo,Mes_Periodo,  Nombre_Cargo_Junta,Nombre_Unidad_Negocio
				)AS MesAnterior

			ON MesActual.Nombre_Cargo_Junta = MesAnterior.Nombre_Cargo_Junta 
			AND MesActual.Nombre_Unidad_Negocio = MesAnterior.Nombre_Unidad_Negocio 
			and MesActual.Ano_Periodo = MesAnterior.Ano_Periodo
			and MesActual.Mes_Periodo = MesAnterior.Mes_Periodo
			LEFT JOIN 

			(SELECT Mes_Periodo,Ano_Periodo+1 Ano_Periodo,Nombre_Cargo_Junta, Nombre_Unidad_Negocio=  case when Nombre_Unidad_Negocio = 'DAIMLER PC (VEHICULOS PASAJEROS)' then 'MERCEDES-BENZ' else Nombre_Unidad_Negocio end, 
			count(*) [Cantidad]
				FROM v_EmpleadosActivosRetirados
				WHERE CodigoEmpresa = 6 
				--AND Mes_Periodo = 12 
				--AND Ano_Periodo = 2023- 1 
				AND codigo_centro IN (84, 108)
				GROUP BY Ano_Periodo,Mes_Periodo,  Nombre_Cargo_Junta,Nombre_Unidad_Negocio) as AñoAnterior 

			ON MesActual.Nombre_Cargo_Junta = AñoAnterior.Nombre_Cargo_Junta 
			AND MesActual.Nombre_Unidad_Negocio = AñoAnterior.Nombre_Unidad_Negocio 
			and MesActual.Ano_Periodo = AñoAnterior.Ano_Periodo
			and MesActual.Mes_Periodo = AñoAnterior.Mes_Periodo
		) B
	) C 
)D 
--where Ano_Periodo=2022
--and Mes_Periodo = 12
group by Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta,	Nombre_Unidad_Negocio


```
