# View: vw_CuadroDePersonal_JuntaDirectivaCT_AG

## Usa los objetos:
- [[EmpleadosActivos]]
- [[v_EmpleadosActivosRetirados]]

```sql
CREATE view [dbo].[vw_CuadroDePersonal_JuntaDirectivaCT_AG]
--MS:141123 vista del procedimiento sp_CuadroDePersonal_JuntaDirectivaCT_AG poder filtrar la informacion
As

SELECT isnull(mesactual.Ano_Periodo,MesAnterior.Ano_Periodo) Ano_Periodo,isnull(mesactual.Mes_Periodo,MesAnterior.Mes_Periodo)Mes_Periodo,RTRIM(LTRIM(ISNULL(MesActual.Nombre_Cargo_Junta,MesAnterior.Nombre_Cargo_Junta))) AS Nombre_Cargo_Junta,
	   RTRIM(LTRIM(ISNULL(MesActual.Nombre_Unidad_Negocio,MesAnterior.Nombre_Unidad_Negocio))) AS Nombre_Unidad_Negocio,
	   Isnull(MesAnterior.Cantidad,0) as Cantidad_Anterior, Isnull(MesActual.Cantidad,0) as Cantidad_Actual, 
	   Isnull(AñoAnterior.Cantidad,0) AS AñoAnterior
  FROM (
		SELECT Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
		  FROM EmpleadosActivos
		 WHERE CodigoEmpresa in (1,5,22,24) 
		 --AND Mes_Periodo = @MesActual  
		 --AND Ano_Periodo = @AnoActual
		 GROUP BY Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta,Nombre_Unidad_Negocio
	   )AS MesActual

FULL OUTER JOIN (SELECT case when Mes_Periodo=12 then 1 else Mes_Periodo+1 end Mes_Periodo,
                        case when Mes_Periodo = 12 then  Ano_Periodo+1 else Ano_Periodo end Ano_Periodo,
					    Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
		           FROM EmpleadosActivos
		          WHERE CodigoEmpresa in (1,5,22,24) 
		          GROUP BY Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta,Nombre_Unidad_Negocio-- order by 1,2,3,4
	            )AS MesAnterior ON MesActual.Nombre_Cargo_Junta = MesAnterior.Nombre_Cargo_Junta 
                               AND MesActual.Nombre_Unidad_Negocio = MesAnterior.Nombre_Unidad_Negocio 
                               AND MesAnterior.Mes_Periodo =  MesActual.Mes_Periodo
                               AND MesAnterior.Ano_Periodo = MesActual.Ano_Periodo 

LEFT JOIN (SELECT Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta, Nombre_Unidad_Negocio, count(*) [Cantidad]
	        FROM v_EmpleadosActivosRetirados
	       WHERE CodigoEmpresa in (1,5,22,24)		        
	        GROUP BY Ano_Periodo,Mes_Periodo,Nombre_Cargo_Junta,Nombre_Unidad_Negocio
		  ) as AñoAnterior ON MesActual.Nombre_Cargo_Junta = AñoAnterior.Nombre_Cargo_Junta 
                          AND MesActual.Nombre_Unidad_Negocio = AñoAnterior.Nombre_Unidad_Negocio 
                          AND AñoAnterior.Mes_Periodo = MesActual.Mes_Periodo 
                          AND AñoAnterior.Ano_Periodo = MesActual.Ano_Periodo - 1

--where MesActual.Ano_Periodo =2024
--and MesActual.Mes_Periodo =1




```
