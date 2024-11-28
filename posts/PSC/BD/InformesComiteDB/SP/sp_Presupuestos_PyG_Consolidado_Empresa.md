# Stored Procedure: sp_Presupuestos_PyG_Consolidado_Empresa

## Usa los objetos:
- [[Presupuestos_PesoLineaPorEmpresa]]
- [[vw_Presupuestos_Lineas]]
- [[vw_Presupuestos_PyG]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_PyG_Consolidado_Empresa]
@CodEmpresa smallint,
@IdClase smallint,
@Ano_Periodo smallint

AS
--****************************
--Autor: Manuel Suarez
-- Date: 12/11/2024
--Descr: Create VW para proyecto presupuestos para realizar el consolidado de P&G por empresa.
--****************************

--****************************
--Autor: Daniel
--Date: 14/11/2024
--Descr: Se ajusta sp para que tome las empresas agrupadas 
--****************************

--****************************
--Autor: Daniel
--Date: 15/11/2024
--Descr: Se ajusta sp para que haga las divisiones de porcentaje de participacion para las lineas y centros y se ajusta para que el GAC siempre este en 0
--****************************

BEGIN

SELECT IdJerarquia,                  Nivel1,                    Nivel2,                    Nivel3,                      Nivel4,                      Nivel5, Nivel6,                CodigoConcepto, 
       NombreConcepto,               IdClase,                   Clase,                     UnidadDeMedidaCalculo,       Ano_Periodo,                 c.CodEmpresaAgrupada,          Enero=SUM(Enero), 
	   Febrero=SUM(Febrero),         Marzo=SUM(Marzo),          Abril=SUM(Abril),          Mayo=SUM(Mayo),              Junio=SUM(Junio) ,           Julio=SUM(Julio),              Agosto=SUM(Agosto),    
	   Septiembre=SUM(Septiembre),   Octubre=SUM(Octubre) ,     Noviembre=SUM(Noviembre),  Diciembre=SUM(Diciembre),    Acumulado=SUM(Acumulado) ,   Porcentaje=SUM(Porcentaje),
	   ColorFondo,				     ColorLetra,				Negrilla 
  FROM (SELECT a.IdJerarquia,        a.Nivel1,             a.Nivel2,             a.Nivel3,        a.Nivel4,          a.Nivel5,            
               a.Nivel6,             a.CodigoConcepto,     a.NombreConcepto,     a.IdClase,       a.Clase,           a.UnidadDeMedidaCalculo,       
			   a.Ano_Periodo,     b.CodEmpresaAgrupada,    a.ColorFondo,			a.ColorLetra,    a.Negrilla,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Enero) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Enero) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Enero) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Enero) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Enero)
				   END Enero,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Febrero) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Febrero) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Febrero) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Febrero) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Febrero)
				   END Febrero, 

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Marzo) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Marzo) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Marzo) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Marzo) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Marzo)
				   END Marzo,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Abril) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Abril) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Abril) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Abril) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Abril)
				   END Abril,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Mayo) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Mayo) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Mayo) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Mayo) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Mayo)
				   END Mayo,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Junio) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Junio) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Junio) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Junio) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Junio)
				   END Junio,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Julio) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Julio) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Julio) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Julio) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Julio)
				   END Julio,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Agosto) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Agosto) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Agosto) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Agosto) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Agosto)
				   END Agosto,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Septiembre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Septiembre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Septiembre) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Septiembre) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Septiembre)
				   END Septiembre,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Octubre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Octubre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Octubre) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Octubre) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Octubre)
				   END Octubre,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Noviembre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Noviembre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Noviembre) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Noviembre) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Noviembre)
				   END Noviembre,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Diciembre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Diciembre) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Diciembre) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Diciembre) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Diciembre)
				   END Diciembre,

		      CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Acumulado) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Acumulado) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Acumulado) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Acumulado) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Acumulado)
				   END Acumulado,

			  CASE WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 418 THEN SUM(a.Porcentaje) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 418 THEN SUM(a.Porcentaje) * ppl.PorcentajeParticipacion / 100
				   WHEN b.CodEmpresa = 1 AND a.CodigoLinea = 4 AND a.CodigoCentro = 48 THEN SUM(a.Porcentaje) 
				   WHEN b.CodEmpresa = 6 AND a.CodigoLinea = 4 AND a.CodigoCentro = 78 THEN SUM(a.Porcentaje) 
				   WHEN a.IdJerarquia = 328 THEN 0
				   ELSE SUM(a.Porcentaje)
				   END Porcentaje

	   FROM vw_Presupuestos_PyG a
  LEFT JOIN vw_Presupuestos_Lineas b 
         ON a.CodigoLinea = b.Codigo_Linea
  LEFT JOIN Presupuestos_PesoLineaPorEmpresa ppl 
         ON ppl.CodigoEmpresa = b.CodEmpresaAgrupada 
		AND ppl.CodigoLinea   = b.Codigo_Linea 
   GROUP BY IdJerarquia,       Nivel1,             Nivel2,        Nivel3,                        Nivel4,                    Nivel5,          Nivel6,        
            CodigoConcepto,    NombreConcepto,     IdClase,       Clase,                         UnidadDeMedidaCalculo,     Ano_Periodo,     b.CodEmpresaAgrupada,   
		    ColorFondo,        ColorLetra,         Negrilla,      ppl.PorcentajeParticipacion,   CodEmpresa,                CodigoCentro,    a.CodigoLinea
		) c
  WHERE IdClase             = @IdClase
    AND Ano_Periodo         = @Ano_Periodo
    AND CodEmpresaAgrupada  = @CodEmpresa 
  GROUP BY IdJerarquia,       Nivel1,             Nivel2,        Nivel3,    Nivel4,                    Nivel5,          Nivel6,        
           CodigoConcepto,    NombreConcepto,     IdClase,       Clase,     UnidadDeMedidaCalculo,     Ano_Periodo,     c.CodEmpresaAgrupada,   
 		   ColorFondo,        ColorLetra,         Negrilla     
  ORDER BY IdJerarquia

END

```
