# View: vw_GAC_Activos_Operativos_Presupuesto

## Usa los objetos:
- [[vw_GAC_Datos_Activos_Operativos]]

```sql


--DROP VIEW vw_GAC_Activos_Operativos
CREATE VIEW [dbo].[vw_GAC_Activos_Operativos_Presupuesto] AS

--****************************
--Autor: Mnauel Suarez
-- Date: 07112024
--Descr: Create VW para proyecto presupuesto. Generera el calculo de Activos operativoss para GAC.
--Se replica de las vista de la base DBMLC_0190
--****************************
select a.Ano_Periodo, a.trimestre,  a.CodUnidadNegocio, a.NombreUnidadNegocio, sum(Activos_Fijos)/3 Activos_Fijos,--case when tipo = 'Activos Fijos' then valor else 0 end Activos_Fijos,
       sum(Cartera)/3 Cartera,sum(Inventario)/3 Inventario ,--case when tipo = 'Cartera' then valor else 0 end Cartera, case when tipo = 'Inventario' then valor else 0 end Inventario, 
	   valorpromedio/3  Promedio,    (sum(valorpromedio)/sum(total))*100 porcentaje 
  from (--SELECT IdEmpresas, Ano_Periodo,  trimestre,   CodUnidadNegocio, NombreUnidadNegocio,tipo, sum(Valor/3)valor
         -- FROM vw_GAC_Datos_Activos_Operativos          a
         ----WHERE  Ano_Periodo=2024 AND trimestre='1(ene-mar)' --and CodUnidadNegocio=410
         --GROUP BY Ano_Periodo, trimestre , CodUnidadNegocio, NombreUnidadNegocio, IdEmpresas,tipo
		SELECT Ano_Periodo,   trimestre,   CodUnidadNegocio,  NombreUnidadNegocio, ISNULL([Activos_Fijos], 0) AS [Activos_Fijos], 
               ISNULL([Cartera], 0) AS Cartera,   ISNULL([Inventario], 0) AS Inventario
          FROM [DBMLC_0190]..vw_GAC_Datos_Activos_Operativos    
         PIVOT (sum(Valor)   FOR tipo IN ([Activos_Fijos], [Cartera], [Inventario])
             ) AS pvt 		  
		--WHERE Ano_Periodo=2023 AND trimestre='2(abr-jun)'

       )a
  left join (SELECT Ano_Periodo,  trimestre, CodUnidadNegocio, NombreUnidadNegocio, sum(Valor/3)valorpromedio
               FROM [DBMLC_0190]..vw_GAC_Datos_Activos_Operativos      	    a
                 --WHERE  Ano_Periodo=2023 AND trimestre='2(abr-jun)' --and CodUnidadNegocio=410
              GROUP BY Ano_Periodo, trimestre , CodUnidadNegocio, NombreUnidadNegocio
            )b on b.Ano_Periodo=a.Ano_Periodo
		      and b.trimestre =a.trimestre
		      and b.CodUnidadNegocio =a.CodUnidadNegocio
		      --and b.IdEmpresas =a.IdEmpresas
  left join (SELECT Ano_Periodo,  trimestre,   sum(Valor/3) total
               FROM [DBMLC_0190]..vw_GAC_Datos_Activos_Operativos
             --WHERE Ano_Periodo=2023 AND trimestre='2(abr-jun)' --and CodUnidadNegocio=410
              GROUP BY Ano_Periodo, trimestre 
		     ) c on c.Ano_Periodo=b.Ano_Periodo
		         and c.trimestre =b.trimestre
 WHERE b.Ano_Periodo=year(getdate()) --AND b.trimestre='2(abr-jun)'--'1(ene-mar)' 
group by a.Ano_Periodo, a.trimestre,  a.CodUnidadNegocio, a.NombreUnidadNegocio,valorpromedio

```
