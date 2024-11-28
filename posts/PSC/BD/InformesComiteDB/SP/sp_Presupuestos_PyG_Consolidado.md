# Stored Procedure: sp_Presupuestos_PyG_Consolidado

## Usa los objetos:
- [[vw_Presupuestos_PyG]]

```sql

CREATE PROCEDURE [dbo].[sp_Presupuestos_PyG_Consolidado]
@CodigoLinea smallint,
@IdClase smallint,
@Ano_Periodo smallint

AS
BEGIN

select IdJerarquia,               Nivel1,                   Nivel2,                   Nivel3,                   Nivel4,              Nivel5, Nivel6,       CodigoConcepto, 
       NombreConcepto,            IdClase,                  Clase,                    UnidadDeMedidaCalculo,    Ano_Periodo,         CodigoLinea,          SUM (Enero) Enero, 
	   SUM(Febrero)Febrero,       SUM(Marzo)Marzo,          SUM(Abril)Abril,          SUM(Mayo)Mayo,            SUM(Junio) Junio,    SUM(Julio)Julio,      SUM(Agosto)Agosto,    
	   SUM(Septiembre)Septiembre, SUM(Octubre) Octubre,     SUM(Noviembre)Noviembre,  SUM(Diciembre)Diciembre,  SUM(Acumulado) Acumulado,                  sum(Porcentaje) Porcentaje,
	   ColorFondo,				  ColorLetra,				Negrilla	
	   

from vw_Presupuestos_PyG 
WHERE CodigoLinea = @CodigoLinea and IdClase = @IdClase and Ano_Periodo = @Ano_Periodo
group by IdJerarquia,            Nivel1,      Nivel2,       Nivel3,     Nivel4,     Nivel5,      Nivel6,        CodigoConcepto, NombreConcepto, IdClase,  Clase,
         UnidadDeMedidaCalculo,  Ano_Periodo, CodigoLinea, ColorFondo, ColorLetra, Negrilla
order by IdJerarquia


END

```
