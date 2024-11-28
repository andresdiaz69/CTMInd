# View: vw_Presupuestos_PyG_Acumulado

## Usa los objetos:
- [[vw_Presupuestos_PyG]]

```sql
CREATE VIEW vw_Presupuestos_PyG_Acumulado
AS
select IdJerarquia,               Nivel1,                   Nivel2,                   Nivel3,                   Nivel4,              Nivel5, Nivel6,       CodigoConcepto, 
       NombreConcepto,            IdClase,                  Clase,                    UnidadDeMedidaCalculo,    Ano_Periodo,         CodigoLinea,          SUM (Enero) Enero, 
	   SUM(Febrero)Febrero,       SUM(Marzo)Marzo,          SUM(Abril)Abril,          SUM(Mayo)Mayo,            SUM(Junio) Junio,    SUM(Julio)Julio,      SUM(Agosto)Agosto,    
	   SUM(Septiembre)Septiembre, SUM(Octubre) Octubre,     SUM(Noviembre)Noviembre,  SUM(Diciembre)Diciembre,  SUM(Acumulado) Acumulado,                  sum(Porcentaje) Porcentaje,
	   ColorFondo,				  ColorLetra,				Negrilla	
	   

from vw_Presupuestos_PyG 
group by IdJerarquia,            Nivel1,      Nivel2,       Nivel3,     Nivel4,     Nivel5,      Nivel6,        CodigoConcepto, NombreConcepto, IdClase,  Clase,
         UnidadDeMedidaCalculo,  Ano_Periodo, CodigoLinea, ColorFondo, ColorLetra, Negrilla

```
