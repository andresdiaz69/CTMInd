# View: vw_BibliotecaPer_Excepciones

## Usa los objetos:
- [[BibliotecaPer_Excepciones]]

```sql
CREATE VIEW [dbo].[vw_BibliotecaPer_Excepciones] AS

SELECT a.IdExcepciones, EmpleadoExisteCompañia =  CASE a.Empleado WHEN 1 THEN 'Si' else 'No' End, a.CedulaEmpleado, a.NombreEmpleado, a.CargoEmpleado, a.CompañiaEmpleado,
a.CodModulo, a.NombreModulo, a.NombreVentana, a.DescripcionVentana, a.CodRol,a.NombreRol, a.DescripcionRol, a.Observaciones,
a.CodEmpleadoAutoriza, a.NombreEmpleadoAutoriza, a.Imagen
 FROM [dbo].[BibliotecaPer_Excepciones] a


```
